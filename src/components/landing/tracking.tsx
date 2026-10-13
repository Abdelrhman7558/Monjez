import Script from "next/script";

// Tracking carried over from the previous monjez-platform landing so reporting continues on the new page.
const WHOP_SCOPE = "biz_vo2A9AAiSPMRPJ";
const GA_ID = "G-J5VM62KXDP";
const META_PIXEL_ID = "1674114750722139";

export function LandingTracking() {
    return (
        <>
            <Script id="whop-pixel" strategy="afterInteractive">
                {`!function(w,d,s,u,n,a,b){if(w[n])return;a=w[n]={q:[],t:+new Date,s:[],o:u,track:function(){a.q.push([+new Date].concat([].slice.call(arguments)))},setScope:function(){a.s=[].slice.call(arguments).filter(function(x){return typeof x==="string"});a.q.push([+new Date,"setScope"].concat(a.s))},scope:function(){var c=[].slice.call(arguments);return{track:function(){a.q.push([+new Date].concat([].slice.call(arguments)).concat([{__scope:c}]))}}}};b=d.createElement(s);b.async=1;b.src=u+"/s.js";d.getElementsByTagName(s)[0].parentNode.insertBefore(b,d.getElementsByTagName(s)[0])}(window,document,"script","https://t.whop.tw","whop");whop.setScope("${WHOP_SCOPE}");whop.track("page");`}
            </Script>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-landing" strategy="afterInteractive">
                {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
            <Script id="meta-pixel" strategy="afterInteractive">
                {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
            </Script>
            <noscript>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`} />
            </noscript>
        </>
    );
}

type TrackWindow = Window & { fbq?: (...args: unknown[]) => void; gtag?: (...args: unknown[]) => void; whop?: { track: (...args: unknown[]) => void } };

/** Fires the conversion events once an application has actually been delivered. */
export function trackLead(tier: string) {
    const w = window as TrackWindow;
    try {
        w.fbq?.("track", "Lead", { content_name: "contractor-landing", status: tier });
        w.gtag?.("event", "generate_lead", { lead_tier: tier });
        w.whop?.track("lead", { tier });
    } catch {
        // tracking must never break the booking flow
    }
}
