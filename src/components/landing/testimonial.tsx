"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { useContent } from "./content-context";
import { LANDING_CONFIG } from "./config";
import { Container, Reveal, Section, SectionHead } from "./primitives";

export function Testimonial() {
    const [playing, setPlaying] = useState(false);
    const { TESTIMONIAL: T, UI } = useContent();

    return (
        <Section id="results" tone="cream">
            <Container>
                <SectionHead eyebrow={T.eyebrow} title={T.title} accent={T.titleAccent} sub={T.sub} />

                <Reveal className="mx-auto mt-12 grid max-w-[1100px] overflow-hidden rounded-3xl border border-mj-line bg-white shadow-[0_30px_60px_-40px_rgba(23,31,46,0.35)] lg:grid-cols-[1.25fr_1fr]">
                    <div className="relative aspect-video bg-mj-ink lg:aspect-auto lg:min-h-[400px]">
                        {playing ? (
                            <iframe
                                src={`${LANDING_CONFIG.testimonialEmbedUrl}?autoplay=1&hide_owner=true&hide_share=true`}
                                title={UI.testimonial.iframe}
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 h-full w-full border-0"
                            />
                        ) : (
                            <button
                                type="button"
                                onClick={() => setPlaying(true)}
                                className="group absolute inset-0 flex h-full w-full flex-col justify-between p-5 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-mj-accent-line sm:p-6"
                                aria-label={UI.testimonial.play}
                            >
                                <span
                                    aria-hidden
                                    className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:40px_40px]"
                                />
                                <span className="relative flex items-center gap-2">
                                    <Image src="/brand/monjez-mark-light.webp" alt="" width={445} height={356} sizes="32px" className="h-5 w-auto" />
                                    <Image src="/brand/monjez-wordmark-light.webp" alt="" width={579} height={72} sizes="80px" className="h-[9px] w-auto opacity-80" />
                                </span>
                                <span className="relative mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition-transform duration-200 group-hover:scale-105">
                                    <Play className="h-7 w-7 translate-x-0.5 fill-current" aria-hidden />
                                </span>
                                <span className="relative text-[13.5px] font-medium text-white/85">{T.watch}</span>
                            </button>
                        )}
                    </div>
                    <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mj-muted">{UI.testimonial.label}</p>
                        <blockquote className="mt-5 flex-1 font-display text-[21px] font-medium leading-[1.45] tracking-[-0.01em] text-mj-ink sm:text-[24px]">
                            “{T.quote}”
                        </blockquote>
                        <div className="mt-7 flex items-center gap-3 border-t border-mj-line pt-6">
                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mj-accent font-display text-[16px] font-semibold text-white" aria-hidden>
                                {T.name[0]}
                            </span>
                            <div>
                                <p className="text-[15px] font-semibold text-mj-ink">{T.name}</p>
                                <p className="text-[13px] text-mj-muted">{T.role}</p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal className="mx-auto mt-5 grid max-w-[1100px] gap-5 md:grid-cols-[1.4fr_1fr]">
                    <div className="rounded-3xl border border-mj-line bg-white p-6 sm:p-7">
                        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mj-accent">{T.contextTitle}</p>
                        <p className="mt-3 text-[15px] leading-[1.65] text-mj-body">{T.context}</p>
                    </div>
                    <div className="flex items-center rounded-3xl border border-dashed border-mj-accent-line bg-mj-accent-soft/50 p-6 sm:p-7">
                        <p className="text-[14.5px] leading-relaxed text-mj-accent-deep">{T.pending}</p>
                    </div>
                </Reveal>
            </Container>
        </Section>
    );
}
