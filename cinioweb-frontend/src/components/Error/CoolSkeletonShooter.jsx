import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./CoolSkeletonShooter.css";

/**
 * Inline SVG + GSAP. Each visual part has its own SVG id so GSAP can animate it.
 * Install: npm install gsap
 */
export default function CoolSkeletonShooter({ className = "" }) {
  const wrapRef = useRef(null);

  useLayoutEffect(() => {
    const root = wrapRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const $ = (id) => root.querySelector(`#${id}`);
      const character = $("character");
      const gun = $("gun");
      const trigger = $("trigger");
      const bullet = $("bullet");
      const flash = $("muzzleFlash");
      const bottle = $("targetBottle");
      const shards = $("glassShards");
      const shardParts = gsap.utils.toArray("#glassShards .glass-shard", root);
      const ring = $("impactRing");

      // Do not abort the animation when the OS requests reduced motion.
      // This is an explicitly requested animated illustration. The idle bob is
      // kept subtle; the firing sequence remains active so the page still works.
      if (![character, gun, trigger, bullet, flash, bottle, shards, ring].every(Boolean)) {
        console.error("CoolSkeletonShooter: one or more SVG animation targets are missing.");
        return;
      }

      // SVG attributes are animated with GSAP transforms; transformOrigin is set explicitly.
      gsap.set(character, { transformOrigin: "50% 55%" });
      gsap.set(gun, { transformOrigin: "15% 50%" });
      gsap.set(trigger, { transformOrigin: "50% 0%" });
      gsap.set([flash, bullet, shards, ring], { autoAlpha: 0 });
      gsap.set(bottle, { autoAlpha: 1, scale: 1, rotation: 0 });
      gsap.set(shardParts, { x: 0, y: 0, rotation: 0, transformOrigin: "50% 50%" });

      // Subtle idle movement.
      gsap.to(character, {
        y: -5, duration: 1.35, ease: "sine.inOut", yoyo: true, repeat: -1
      });

      // The target bottle has a tiny distant wobble before each shot.
      const sequence = gsap.timeline({ repeat: -1, repeatDelay: 0.65 });
      sequence
        .to(bottle, { rotation: 3, transformOrigin: "50% 100%", duration: 0.13, yoyo: true, repeat: 1, ease: "sine.inOut" })
        // Finger pulls the trigger.
        .to(trigger, { rotation: -24, duration: 0.09, ease: "power2.in" })
        .to(trigger, { rotation: 0, duration: 0.14, ease: "back.out(2)" })
        // Gun kick and flash.
        .to(gun, { x: -9, duration: 0.07, ease: "power2.out" }, "<")
        .to(flash, { autoAlpha: 1, scale: 1.2, duration: 0.07, transformOrigin: "50% 50%" }, "<")
        .to(flash, { autoAlpha: 0, scale: 0.35, duration: 0.12 })
        .to(gun, { x: 0, duration: 0.18, ease: "elastic.out(1, 0.4)" }, "<")
        // Bullet travels from barrel to the distant bottle.
        .set(bullet, { x: 548, y: 307, autoAlpha: 1 })
        .to(bullet, { x: 748, y:507, duration: 0.42, ease: "power1.in" })
        .set(bullet, { autoAlpha: 0 })
        // Bottle breaks into visible glass pieces.
        .to(bottle, { scale: 0.72, autoAlpha: 0, duration: 0.08, transformOrigin: "50% 100%" })
        .set([shards, ring], { autoAlpha: 1 })
        .fromTo(ring, { scale: 0.35 }, { scale: 1.5, autoAlpha: 0, duration: 0.28, ease: "power2.out" }, "<")
        .to(shardParts, {
          x: (i) => [ -32, 20, -48, 43, -8, 58, -56 ][i],
          y: (i) => [ -35, -48, 22, 36, 55, -10, -62 ][i],
          rotation: (i) => [ -115, 90, -80, 130, 75, -145, 110 ][i],
          duration: 0.42, ease: "power2.out", stagger: 0.012
        }, "<")
        // Hold the broken glass briefly, then pull every shard back together.
        .to(shardParts, {
          x: 0, y: 0, rotation: 0, duration: 0.48,
          ease: "power2.inOut", stagger: 0.018
        }, "+=0.55")
        .to(shards, { autoAlpha: 0, duration: 0.08 }, "-=0.08")
        .to(bottle, { scale: 1, autoAlpha: 1, duration: 0.28, ease: "back.out(1.7)" }, "<")
        .to(bottle, { rotation: 0, duration: 0.12 }, "<");
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className={`cool-skeleton-shooter ${className}`}>
      <svg viewBox="0 0 900 520" role="img" aria-label="Cool hooded skeleton shoots a distant green bottle" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hoodFillReact" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7199ed"/><stop offset=".55" stopColor="#315fb6"/><stop offset="1" stopColor="#193c83"/>
          </linearGradient>
          <linearGradient id="glassFillReact" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#a4f1a8"/><stop offset=".5" stopColor="#31b66d"/><stop offset="1" stopColor="#087b4a"/>
          </linearGradient>
          <linearGradient id="lensFillReact" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#713cff"/><stop offset="1" stopColor="#26008d"/>
          </linearGradient>
        </defs>
        <style>{`
          .line{fill:none;stroke:#202020;stroke-width:6;stroke-linecap:round;stroke-linejoin:round}
          .detail{fill:none;stroke:#202020;stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round}
          .bottle-shape{fill:url(#glassFillReact);stroke:#102c24;stroke-width:7;stroke-linejoin:round}
        `}</style>

        <g id="targetBottle" transform="translate(754 315)">
          <path className="bottle-shape" d="M24 0h35v19l-6 13v18l18 24v87q0 13-13 13H9q-13 0-13-13V74l18-24V32l-6-13V0z"/>
          <path d="M16 18h51M8 88q31 13 63 0M9 112q30 12 61 0" fill="none" stroke="#075d3d" strokeWidth="5" strokeLinecap="round"/>
          <path d="M20 38h9v39h-9zM8 94q5 4 12 5v45q-8-2-12-9z" fill="#d7ffd4" opacity=".75"/>
          <path d="M23 7h37" stroke="#d7ffd4" strokeWidth="4" strokeLinecap="round"/>
        </g>

        <g id="glassShards" opacity="0">
          <path className="glass-shard" d="M770 320l16 13-10 28-17-15z" fill="#68df91" stroke="#075d3d" strokeWidth="3"/>
          <path className="glass-shard" d="M807 332l20 4-3 30-21-9z" fill="#a4f1a8" stroke="#075d3d" strokeWidth="3"/>
          <path className="glass-shard" d="M750 378l20-7 8 25-19 13z" fill="#31b66d" stroke="#075d3d" strokeWidth="3"/>
          <path className="glass-shard" d="M801 390l18-12 17 20-24 16z" fill="#7de99a" stroke="#075d3d" strokeWidth="3"/>
          <path className="glass-shard" d="M781 355l16 4-2 27-17-5z" fill="#d7ffd4" stroke="#075d3d" strokeWidth="3"/>
          <path className="glass-shard" d="M834 354l16 8-11 22-15-9z" fill="#39bd73" stroke="#075d3d" strokeWidth="3"/>
          <path className="glass-shard" d="M764 342l-13-11 4-20 17 12z" fill="#b8f5bd" stroke="#075d3d" strokeWidth="3"/>
        </g>
        <g id="impactRing" opacity="0" fill="none" stroke="#f7c948" strokeWidth="5">
          <circle cx="790" cy="380" r="26"/><path d="M790 337v-15m0 116v-15m-43-43h-15m116 0h-15"/>
        </g>

        <g id="character">
          <path d="M92 281Q86 185 150 102L285 26Q308 12 331 30L458 147Q503 190 496 278L476 345Q461 388 411 393L145 393Q91 382 92 326z" fill="url(#hoodFillReact)" stroke="#071b4b" strokeWidth="13" strokeLinejoin="round"/>
          <path d="M143 280Q142 190 198 117L293 58Q308 49 321 62L429 166Q464 203 456 286L437 328Q418 356 382 356H169Q128 346 143 280z" fill="#193d83" stroke="#0a245a" strokeWidth="8" strokeLinejoin="round"/>
          <path d="M177 285Q179 177 252 115Q315 66 384 113Q449 156 454 250L431 322Q404 347 353 345H201Q168 331 177 285z" fill="#f8fbff" stroke="#7898a5" strokeWidth="11" strokeLinejoin="round"/>
          <path d="M188 161Q242 105 310 108Q377 104 427 159" fill="none" stroke="#d7e8f5" strokeWidth="13" strokeLinecap="round"/>
          <path d="M197 244Q195 157 255 124Q322 89 388 133Q444 172 438 257L423 313Q413 350 374 357L262 355Q218 347 203 308z" fill="#fff" stroke="#7898a5" strokeWidth="9" strokeLinejoin="round"/>
          <path d="M218 157q24-28 58-4M376 145q28-17 49 12" fill="none" stroke="#7898a5" strokeWidth="12" strokeLinecap="round"/>
          <path d="M304 277q17-33 35 0q-17 21-35 0z" fill="#07101e" stroke="#07101e" strokeWidth="5"/>
          <path d="M264 331q28 25 63 0q25 17 48-2" fill="none" stroke="#7898a5" strokeWidth="9" strokeLinecap="round"/>
          <path d="M285 346l-2 17m22-13v18m22-18l3 15" stroke="#7898a5" strokeWidth="7" strokeLinecap="round"/>

          <g id="glasses">
            <path d="M164 211Q232 180 293 203L300 279Q294 330 238 334Q178 334 166 288z" fill="url(#lensFillReact)" stroke="#050505" strokeWidth="14" strokeLinejoin="round"/>
            <path d="M309 204Q371 179 442 210L437 286Q427 332 377 333Q321 330 309 284z" fill="url(#lensFillReact)" stroke="#050505" strokeWidth="14" strokeLinejoin="round"/>
            <path d="M291 213Q305 195 321 213" fill="none" stroke="#050505" strokeWidth="15" strokeLinecap="round"/>
            <path d="M210 226l26-8-12 36 22-4-28 62 7-45-23 4zM358 223l25-8-12 36 22-4-29 62 8-45-23 4z" fill="#8d70ff" opacity=".8"/>
            <path d="M172 215q-19-5-26 8M438 213q23-5 30 9" fill="none" stroke="#050505" strokeWidth="12" strokeLinecap="round"/>
            <path d="M423 198l13-15 3 20 17-7-12 18 15 7-22 1-6 18-6-20-18 2 15-14z" fill="#fff" stroke="#d9f7ff" strokeWidth="3"/>
          </g>

          <g id="bodyBones" fill="none" stroke="#f8fbff" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round">
            <path d="M248 369q-24 31-9 66m103-66q26 29 12 66"/><path d="M239 390q48 24 101 0M242 411q47 22 96 0"/><path d="M264 432l-17 27m73-27l18 27"/>
          </g>
          <g id="arms" fill="none" stroke="#f8fbff" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round">
            <path d="M248 372L330 345L365 305"/><path d="M255 385L335 360L373 323"/><path d="M365 305l22-5m-22 5l8 18m0-18l16 9"/>
          </g>
          <g id="supportHand" fill="#fff" stroke="#7898a5" strokeWidth="5" strokeLinejoin="round">
            <path d="M344 324q-2-17 12-21l15 7 9 20-12 16-20-7z"/><path d="M351 319l21 17m-15-24l22 17" fill="none" stroke="#7898a5" strokeWidth="5" strokeLinecap="round"/>
          </g>
          <g id="gun">
            <path d="M350 286h151l22 18-22 18H350q-12 0-12-12v-12q0-12 12-12z" fill="#303b54" stroke="#07101e" strokeWidth="9" strokeLinejoin="round"/>
            <path d="M382 322l-8 48q-2 12 12 12h34l16-60z" fill="#ef9b42" stroke="#07101e" strokeWidth="8" strokeLinejoin="round"/>
            <path d="M493 294h43v20h-43" fill="#f6c94d" stroke="#07101e" strokeWidth="8" strokeLinejoin="round"/>
            <path d="M367 300h28m73 0h22" stroke="#aabbd4" strokeWidth="5" strokeLinecap="round"/>
            <g id="trigger"><path d="M449 322q-1 22 17 23q13-1 12-17" fill="none" stroke="#f6c94d" strokeWidth="8" strokeLinecap="round"/></g>
            <circle cx="420" cy="305" r="7" fill="#8d70ff"/>
          </g>
          <g id="muzzleFlash" opacity="0">
            <path d="M545 304l25-16-5 22 27-3-23 19 18 17-29-6-10 25-7-28-26 5 19-21-14-19z" fill="#ffe05b" stroke="#d77d22" strokeWidth="5" strokeLinejoin="round"/>
          </g>
          <g id="bullet" transform="translate(548 307)">
            <path d="M-3 0Q13-9 30 0Q13 9-3 0z" fill="#fff1a6" stroke="#e69a23" strokeWidth="3"/><path d="M-13 0h-26" stroke="#ffe05b" strokeWidth="4" strokeLinecap="round"/>
          </g>
        </g>
        <path d="M54 478q180 10 360 0t420 0" fill="none" stroke="#a9bdc7" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    </div>
  );
}
