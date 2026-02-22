"use client";

import { useState, useEffect } from "react";
import {
    Calendar, CheckCircle2, Clock, Plus, Target,
    TrendingUp, Trash2, ListTodo, Sparkles, Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSupabaseClient } from "@/lib/supabase/client";

export default function PlannerPage() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [habits, setHabits] = useState<any[]>([]);
    const [habitLogs, setHabitLogs] = useState<Record<string, string[]>>({});
    const [newTask, setNewTask] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const supabase = createSupabaseClient();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                // Fetch Tasks
                const { data: tasksData } = await supabase
                    .from('tasks')
                    .select('*')
                    .order('created_at', { ascending: false });

                // Fetch Habits
                const { data: habitsData } = await supabase
                    .from('habits')
                    .select('*');

                // Fetch Habit Logs for current week
                const { data: logsData } = await supabase
                    .from('habit_logs')
                    .select('*')
                    .gte('completed_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

                setTasks(tasksData || []);
                setHabits(habitsData || []);

                const logsMap: Record<string, string[]> = {};
                logsData?.forEach(log => {
                    if (!logsMap[log.habit_id]) logsMap[log.habit_id] = [];
                    logsMap[log.habit_id].push(log.completed_at);
                });
                setHabitLogs(logsMap);

            } catch (err) {
                console.error("Planner Data Fetch Error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const addTask = async () => {
        if (!newTask.trim()) return;
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
            .from('tasks')
            .insert({ title: newTask, user_id: user.id })
            .select()
            .single();

        if (data) {
            setTasks([data, ...tasks]);
            setNewTask("");
        }
    };

    const toggleTask = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'completed' ? 'todo' : 'completed';
        const { error } = await supabase
            .from('tasks')
            .update({ status: newStatus })
            .eq('id', id);

        if (!error) {
            setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
        }
    };

    const deleteTask = async (id: string) => {
        const { error } = await supabase.from('tasks').delete().eq('id', id);
        if (!error) {
            setTasks(tasks.filter(t => t.id !== id));
        }
    };

    return (
        <div className="space-y-8 pb-20">
            <div className="flex justify-between items-center">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Calendar className="w-8 h-8 text-monjez-accent" />
                        Daily Planner & Habits
                    </h1>
                    <p className="text-gray-400 text-sm">Organize your business goals and master your routines.</p>
                </div>
                <div className="p-4 bg-monjez-blue/20 rounded-2xl border border-monjez-blue/30 flex items-center gap-4">
                    <TrendingUp className="w-6 h-6 text-monjez-accent" />
                    <div>
                        <div className="text-xs text-gray-400 uppercase font-bold tracking-widest">Efficiency</div>
                        <div className="text-xl font-bold text-white">84%</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Tasks Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <ListTodo className="w-5 h-5 text-monjez-accent" />
                                Today's Focus
                            </h3>
                            <span className="text-xs text-gray-500 font-medium">{tasks.filter(t => t.status === 'completed').length}/{tasks.length} Completed</span>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Add a new challenge for today..."
                                className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-14 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-monjez-accent transition-all"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addTask()}
                            />
                            <Plus className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <button
                                onClick={addTask}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-monjez-accent text-black rounded-xl hover:bg-monjez-accent/90 transition-all font-bold shadow-sm"
                            >
                                <Sparkles className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            {tasks.length === 0 && !isLoading && (
                                <div className="text-center py-10 opacity-40">
                                    <ListTodo className="w-12 h-12 mx-auto mb-3" />
                                    <p className="text-sm">No tasks yet. Start by defining your first goal.</p>
                                </div>
                            )}
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className={cn(
                                        "group flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer",
                                        task.status === 'completed'
                                            ? "bg-black/20 border-white/5 opacity-60"
                                            : "bg-white/5 border-white/10 hover:border-monjez-accent/50 hover:bg-white/[0.07]"
                                    )}
                                    onClick={() => toggleTask(task.id, task.status)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-6 h-6 rounded-lg border flex items-center justify-center transition-colors",
                                            task.status === 'completed'
                                                ? "bg-monjez-accent border-monjez-accent"
                                                : "border-gray-600 group-hover:border-monjez-accent"
                                        )}>
                                            {task.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-black" />}
                                        </div>
                                        <div>
                                            <p className={cn(
                                                "text-sm font-medium transition-all",
                                                task.status === 'completed' ? "text-gray-500 line-through" : "text-gray-100"
                                            )}>
                                                {task.title}
                                            </p>
                                            {task.priority && (
                                                <span className={cn(
                                                    "text-[10px] font-bold uppercase tracking-widest",
                                                    task.priority === 'High' ? "text-red-400" : "text-blue-400"
                                                )}>{task.priority} Priority</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
                                            className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Habits Section */}
                <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Activity className="w-5 h-5 text-orange-400" />
                                Habit Tracking
                            </h3>
                            <button className="p-2 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                <Plus className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {habits.length === 0 && !isLoading && (
                                <div className="text-center py-6 opacity-30 italic text-xs">
                                    Define recurring habits to build discipline.
                                </div>
                            )}
                            {habits.map((habit) => (
                                <div key={habit.id} className="space-y-3">
                                    <div className="flex justify-between items-center px-1">
                                        <span className="text-sm font-bold text-white">{habit.title}</span>
                                        <span className="text-[10px] text-monjez-accent font-bold uppercase tracking-wider">
                                            {habitLogs[habit.id]?.length || 0}/7 days
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-7 gap-1.5">
                                        {[...Array(7)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={cn(
                                                    "aspect-square rounded-lg border transition-all cursor-pointer",
                                                    i < (habitLogs[habit.id]?.length || 0)
                                                        ? "bg-monjez-accent border-monjez-accent shadow-[0_0_10px_rgba(205,255,0,0.2)]"
                                                        : "bg-white/5 border-white/10 hover:border-white/20"
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-monjez-accent/10 border border-monjez-accent/20 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-monjez-accent flex items-center justify-center">
                                <Target className="w-6 h-6 text-black" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-white">Focus Mode</h4>
                                <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Consistency is the key to mastery</p>
                            </div>
                        </div>
                        <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                            <div className="h-full bg-monjez-accent w-[65%]" />
                        </div>
                        <p className="text-[11px] text-gray-400 leading-relaxed italic">
                            "أنت لا تنجح بصدفة، أنت تنجح بالتزامك اليومي بالأشياء الصغيرة اللي غالبية الناس بتكسل عنها."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
