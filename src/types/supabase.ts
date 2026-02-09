export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            strategy_call_leads: {
                Row: {
                    id: string
                    created_at: string
                    full_name: string
                    email: string
                    company_type: string
                    role: string
                    main_problem: string
                    monthly_revenue: string
                    status: string
                    referral_source: string | null
                    selected_pricing_tier: string | null
                }
                Insert: {
                    id?: string
                    created_at?: string
                    full_name: string
                    email: string
                    company_type: string
                    role: string
                    main_problem: string
                    monthly_revenue: string
                    status?: string
                    referral_source?: string | null
                    selected_pricing_tier?: string | null
                }
                Update: {
                    id?: string
                    created_at?: string
                    full_name?: string
                    email?: string
                    company_type?: string
                    role?: string
                    main_problem?: string
                    monthly_revenue?: string
                    status?: string
                    referral_source?: string | null
                    selected_pricing_tier?: string | null
                }
            }
            webhook_logs: {
                Row: {
                    id: string
                    created_at: string
                    source: string
                    payload: Json
                    status: number
                }
                Insert: {
                    id?: string
                    created_at?: string
                    source: string
                    payload: Json
                    status: number
                }
            }
        }
    }
}
