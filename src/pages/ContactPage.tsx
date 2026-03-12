
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import emailjs from "@emailjs/browser";
import SharedNav from "../components/SharedNav";

function cn(...inputs: Array<string | undefined | null | false>) {
  return twMerge(clsx(inputs));
}

function BackgroundBeams({ className }: { className?: string }) {
  const paths = [
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
    "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
    "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
    "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
    "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
    "M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
    "M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
    "M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819",
    "M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811",
    "M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803",
    "M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795",
    "M-303 -277C-303 -277 -235 128 229 255C693 382 761 787 761 787",
    "M-296 -285C-296 -285 -228 120 236 247C700 374 768 779 768 779",
    "M-289 -293C-289 -293 -221 112 243 239C707 366 775 771 775 771",
    "M-282 -301C-282 -301 -214 104 250 231C714 358 782 763 782 763",
    "M-275 -309C-275 -309 -207 96 257 223C721 350 789 755 789 755",
    "M-268 -317C-268 -317 -200 88 264 215C728 342 796 747 796 747",
    "M-261 -325C-261 -325 -193 80 271 207C735 334 803 739 803 739",
    "M-254 -333C-254 -333 -186 72 278 199C742 326 810 731 810 731",
    "M-247 -341C-247 -341 -179 64 285 191C749 318 817 723 817 723",
  ];

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center w-full h-full",
        className,
      )}
    >
      <svg
        className="pointer-events-none absolute z-0 h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={paths.join(" ")}
          stroke="url(#paint0_radial_242_278)"
          strokeOpacity="0.05"
          strokeWidth="0.5"
        />

        {paths.map((path, i) => (
          <motion.path
            key={i}
            d={path}
            stroke={`url(#beam-gradient-${i})`}
            strokeOpacity="0.4"
            strokeWidth="0.5"
          />
        ))}

        <defs>
          {paths.map((_, i) => (
            <motion.linearGradient
              key={i}
              id={`beam-gradient-${i}`}
              x1="100%"
              x2="100%"
              y1="100%"
              y2="100%"
              animate={{
                x1: ["0%", "100%"],
                x2: ["0%", "95%"],
                y1: ["0%", "100%"],
                y2: ["0%", `${93 + (i % 8)}%`],
              }}
              transition={{
                duration: 10 + (i % 10),
                ease: "easeInOut",
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <stop stopColor="#18CCFC" stopOpacity="0" />
              <stop stopColor="#2DD4BF" />
              <stop offset="32.5%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0" />
            </motion.linearGradient>
          ))}

          <radialGradient
            id="paint0_radial_242_278"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(352 34) rotate(90) scale(555 1560.62)"
          >
            <stop offset="0.0666667" stopColor="#e5e5e5" />
            <stop offset="0.243243" stopColor="#e5e5e5" />
            <stop offset="0.43594" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
function Spotlight({
  className,
  fill,
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <svg
      className={cn(
        "pointer-events-none absolute z-[1] opacity-0",
        "animate-spotlight",
        className,
      )}
      viewBox="0 0 3787 2842"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#spotlight-filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill || "white"}
          fillOpacity="0.21"
        />
      </g>
      <defs>
        <filter
          id="spotlight-filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  );
}

function MovingBorderButton({
  children,
  onClick,
  disabled,
  className,
  duration = 2000,
  borderRadius = "0.5rem",
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  duration?: number;
  borderRadius?: string;
}) {
  const pathRef = useRef<SVGRectElement>(null);
  const progressRef = useRef(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const animate = (time: number) => {
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        const pxPerMs = length / duration;
        progressRef.current = (time * pxPerMs) % length;
        const point = pathRef.current.getPointAtLength(progressRef.current);
        setX(point.x);
        setY(point.y);
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [duration]);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ borderRadius }}
      className={cn("relative overflow-hidden p-[1px] bg-transparent", className)}
      type="button"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
      >
        <rect ref={pathRef} fill="none" width="100%" height="100%" rx="8" ry="8" />
      </svg>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: `translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`,
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            background: "radial-gradient(#2DD4BF 40%, transparent 60%)",
            opacity: 0.8,
            borderRadius: "50%",
          }}
        />
      </div>

      <div
        style={{ borderRadius: `calc(${borderRadius} - 1px)` }}
        className={cn(
          "relative flex h-full w-full items-center justify-center",
          "bg-white/[0.85] border border-[rgba(167,139,250,0.20)] text-[#1a1a2e]",
          "backdrop-blur-xl antialiased",
        )}
      >
        {children}
      </div>
    </button>
  );
}
function TextGenerateEffect({
  text,
  className,
  delay = 0,
  style,
}: {
  text: string;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const words = text.split(" ");

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: delay },
    },
  };

  const child = {
    hidden: { opacity: 0, filter: "blur(10px)", y: 10 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      style={style}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={child}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = divRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const background = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(45,212,191,0.10), transparent 70%)`;

  return (
    <div ref={divRef} onMouseMove={handleMouseMove} className={cn("relative", className)}>
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl z-0"
        style={{ background }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
export default function ContactPage() {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    service: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

  const msgIdRef = useRef(`MSG_${String(Date.now()).slice(-3)}`);

  useEffect(() => {
    if (document.getElementById("contact-styles")) return;

    const style = document.createElement("style");
    style.id = "contact-styles";
    style.textContent = `
@keyframes spotlight {
  0% { opacity: 0; transform: translate(-72%, -62%) scale(0.5); }
  100% { opacity: 1; transform: translate(-50%, -40%) scale(1); }
}
.animate-spotlight {
  animation: spotlight 2s ease 0.75s 1 forwards;
  height: 169%;
  width: 138%;
}
@media (min-width: 1024px) {
  .animate-spotlight { width: 84%; }
}

@keyframes shake {
  0%,100%{transform:translateX(0)}
  20%{transform:translateX(-6px)}
  40%{transform:translateX(6px)}
  60%{transform:translateX(-4px)}
  80%{transform:translateX(4px)}
}
.field-error { animation: shake 0.35s ease; }

input:-webkit-autofill, input:-webkit-autofill:focus {
  -webkit-text-fill-color:#1a1a2e;
  -webkit-box-shadow:0 0 0px 1000px rgba(249,248,255,0.98) inset;
}

::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:#f9f8ff}
::-webkit-scrollbar-thumb{background:rgba(167,139,250,0.35);border-radius:2px}
`.trim();

    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (!dropdownRef.current?.contains(target)) setDropdownOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  useEffect(() => {
    if (dropdownOpen) setFocused("service");
  }, [dropdownOpen]);

  const handleSubmit = async (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};
    if (!formData.from_name.trim()) newErrors.name = true;
    if (!formData.from_email.trim()) newErrors.email = true;
    if (!formData.message.trim()) newErrors.message = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 500);
      return;
    }

    if (!formData.from_name || !formData.from_email || !formData.message) return;

    setSending(true);
    setError(false);

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.from_name,
          from_email: formData.from_email,
          service: formData.service,
          message: formData.message,
        },
        PUBLIC_KEY,
      );

      setSent(true);
      setFormData({ from_name: "", from_email: "", service: "", message: "" });
      setDropdownOpen(false);
      setFocused(null);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  const services = [
    "Full Stack Web Application",
    "Frontend / UI Development",
    "Backend API & Database",
    "SaaS Product Build",
    "DevOps & Deployment",
    "Something else — let's talk",
  ];

  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/alyanhaider",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57
        0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695
        -.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99
        .105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225
        -.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405
        c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225
        0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3
        0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136
        2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267
        5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782
        13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24
        1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "Fiverr",
      href: "https://www.fiverr.com/alyan_haider259",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-2.855-7.248c0
        1.382-.57 2.748-1.706 3.622-1.195.917-2.88 1.35-5.13 1.35H12.18v4.232H9.047V8.34h5.266c2.1 0
        3.695.421 4.775 1.264 1.08.842 1.561 2.013 1.061 3.736zm-3.26.085c0-.62-.22-1.108-.657-1.464
        -.437-.356-1.1-.534-1.99-.534H12.18v4.048h2.062c.91 0 1.584-.19 2.022-.569.438-.378.625-.883
        .625-1.481z" />
        </svg>
      ),
    },
    {
      label: "Upwork",
      href: "https://www.upwork.com/freelancers/~01d40fc58aa9e1f8fd",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06
        2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14
        c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406
        -1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.543-2.546V3.492H0v7.112c0 2.914 2.37 5.303
        5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673
        7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45
        0-3-2.439-5.439-5.439-5.439z" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/923255629527",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297
        -.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788
        -1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174
        .198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579
        -.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016
        -1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262
        .489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248
        -1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031
        -1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45
        4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994
        c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0
        .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0
        0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      ),
    },
    {
      label: "Email",
      href: "mailto:alyanhaider369@gmail.com",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
  ];

  const inputStyle = (fieldName: string): React.CSSProperties => ({
    width: "100%",
    background:
      focused === fieldName
        ? "rgba(45,212,191,0.12)"
        : "rgba(26,26,46,0.03)",
    border: errors[fieldName]
      ? "1px solid rgba(239,68,68,0.5)"
      : focused === fieldName
        ? "1px solid rgba(45,212,191,0.45)"
        : "1px solid rgba(26,26,46,0.14)",
    borderRadius: 10,
    padding: "13px 15px",
    color: "#1a1a2e",
    fontFamily: "Inter, sans-serif",
    fontSize: 14,
    outline: "none",
    caretColor: "#2DD4BF",
    boxShadow:
      focused === fieldName ? "0 0 0 3px rgba(45,212,191,0.18)" : "none",
    transition: "all 0.2s",
  });

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-transparent">
      <SharedNav activePage="contact" />

      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={{ position: "fixed", top: 24, right: 24, zIndex: 200 }}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl",
          "bg-white/[0.78] border border-[rgba(167,139,250,0.20)]",
        )}
      >
        <motion.div
          animate={{ scale: [1, 1.35, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-[7px] h-[7px] rounded-full bg-green-400"
          style={{ boxShadow: "0 0 10px rgba(74,222,128,0.9)" }}
        />
        <span className="text-[10px] font-medium tracking-widest uppercase text-[#44445a]" style={{ fontFamily: "Inter,sans-serif" }}>
          Available for Work
        </span>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 pb-20 pt-32">
        <div
          className={cn(
            "relative overflow-hidden rounded-[28px] border border-[rgba(167,139,250,0.18)] bg-white/[0.72] backdrop-blur-2xl",
            "shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_32px_80px_rgba(0,0,0,0.12)]",
          )}
        >
          <div className="relative z-10 mx-auto max-w-2xl px-6 pb-20 pt-24 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#2DD4BF]" />
              <span
                className="text-[#2DD4BF] text-[10px] font-medium tracking-[0.28em] uppercase"
                style={{ fontFamily: "Inter,sans-serif" }}
              >
                Contact
              </span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#2DD4BF]" />
            </motion.div>

            <div className="text-center mb-4">
              <TextGenerateEffect
                text="Let's Build"
                delay={0.2}
                className="block font-black text-[#0f0c1d] leading-[0.9] tracking-[-0.06em]"
                style={{
                  fontFamily: "Poppins,sans-serif",
                  fontSize: "clamp(3.2rem,9vw,7rem)",
                }}
              />
              <TextGenerateEffect
                text="Something"
                delay={0.55}
                className="block font-light leading-[0.9] tracking-[-0.06em]"
                style={{
                  fontFamily: "Poppins,sans-serif",
                  fontSize: "clamp(3.2rem,9vw,7rem)",
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(26,26,46,0.28)",
                }}
              />
              <TextGenerateEffect
                text="Real."
                delay={0.9}
                className="block font-black leading-[0.9] tracking-[-0.06em]"
                style={{
                  fontFamily: "Poppins,sans-serif",
                  fontSize: "clamp(3.2rem,9vw,7rem)",
                  background: "linear-gradient(135deg,#2DD4BF,#A78BFA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
              className="text-center text-[#44445a] leading-relaxed mt-7 mb-10 max-w-md mx-auto text-sm"
              style={{ fontFamily: "Inter,sans-serif" }}
            >
              Full stack developer based in Pakistan. Available for freelance, contract,
              and full-time remote work.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="flex items-center justify-center gap-6 flex-wrap mb-12"
            >
          {["⚡ Replies within 24h", "🌍 Remote worldwide", "✦ 3+ years"].map(
            (item, i) => (
              <span
                key={i}
                className="text-[#8888aa] text-xs tracking-wide"
                style={{ fontFamily: "Inter,sans-serif" }}
              >
                {item}
              </span>
            ),
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <SpotlightCard
            className={cn(
              "rounded-2xl border border-[rgba(167,139,250,0.18)] bg-white/[0.62]",
              "backdrop-blur-xl p-8 md:p-12",
              "shadow-[0_0_0_1px_rgba(255,255,255,0.55),0_32px_80px_rgba(0,0,0,0.12)]",
            )}
          >
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-[#8888aa] text-[9px] tracking-[0.22em]"
                      style={{ fontFamily: "Inter,sans-serif" }}
                    >
                      {msgIdRef.current}
                    </span>
                    <span
                      className="flex items-center gap-1.5 text-[#8888aa] text-[9px]"
                      style={{ fontFamily: "Inter,sans-serif" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                      OPEN
                    </span>
                  </div>

                  <div className="h-px w-full bg-[rgba(26,26,46,0.10)] mb-8" />

                  <h2
                    className="text-[#1a1a2e] font-bold mb-1.5"
                    style={{
                      fontFamily: "Poppins,sans-serif",
                      fontSize: "clamp(1.2rem,2.5vw,1.7rem)",
                    }}
                  >
                    Start a Conversation
                  </h2>

                  <p
                    className="text-[#44445a] text-sm mb-9"
                    style={{ fontFamily: "Inter,sans-serif" }}
                  >
                    Tell me about your project — no formalities needed.
                  </p>

                  {/* FIELD 1: Name */}
                  <div style={{ position: "relative", marginBottom: 24 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 500,
                          fontSize: 9,
                          color: "rgba(26,26,46,0.42)",
                          letterSpacing: "0.15em",
                        }}
                      >
                        01
                      </span>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 600,
                          fontSize: 9,
                          color: "rgba(26,26,46,0.62)",
                          letterSpacing: "0.20em",
                          textTransform: "uppercase",
                        }}
                      >
                        YOUR NAME
                      </span>
                    </div>

                    <motion.input
                      whileFocus={{ scale: 1.005 }}
                      type="text"
                      placeholder="Your full name"
                      value={formData.from_name}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, from_name: e.target.value }))
                      }
                      className={errors.name ? "field-error" : ""}
                      style={inputStyle("name")}
                    />

                    <div
                      style={{
                        position: "absolute",
                        height: 2,
                        bottom: 0,
                        left: 0,
                        background: "linear-gradient(to right, #2DD4BF, #A78BFA)",
                        borderRadius: "0 0 10px 10px",
                        width: focused === "name" ? "100%" : "0%",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>

                  {/* FIELD 2: Email */}
                  <div style={{ position: "relative", marginBottom: 24 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 500,
                          fontSize: 9,
                          color: "rgba(26,26,46,0.42)",
                          letterSpacing: "0.15em",
                        }}
                      >
                        02
                      </span>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 600,
                          fontSize: 9,
                          color: "rgba(26,26,46,0.62)",
                          letterSpacing: "0.20em",
                          textTransform: "uppercase",
                        }}
                      >
                        EMAIL ADDRESS
                      </span>
                    </div>

                    <motion.input
                      whileFocus={{ scale: 1.005 }}
                      type="email"
                      placeholder="your@email.com"
                      value={formData.from_email}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, from_email: e.target.value }))
                      }
                      className={errors.email ? "field-error" : ""}
                      style={inputStyle("email")}
                    />

                    <div
                      style={{
                        position: "absolute",
                        height: 2,
                        bottom: 0,
                        left: 0,
                        background: "linear-gradient(to right, #2DD4BF, #A78BFA)",
                        borderRadius: "0 0 10px 10px",
                        width: focused === "email" ? "100%" : "0%",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>

                  {/* FIELD 3: Service */}
                  <div style={{ position: "relative", marginBottom: 24 }} ref={dropdownRef}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 500,
                          fontSize: 9,
                          color: "rgba(26,26,46,0.42)",
                          letterSpacing: "0.15em",
                        }}
                      >
                        03
                      </span>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 600,
                          fontSize: 9,
                          color: "rgba(26,26,46,0.62)",
                          letterSpacing: "0.20em",
                          textTransform: "uppercase",
                        }}
                      >
                        I NEED HELP WITH
                      </span>
                    </div>

                    <motion.div
                      whileFocus={{ scale: 1.005 }}
                      role="button"
                      tabIndex={0}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      onFocus={() => setFocused("service")}
                      onBlur={() => setFocused(null)}
                      style={{
                        ...inputStyle("service"),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        userSelect: "none",
                        color: formData.service ? "#1a1a2e" : "rgba(26,26,46,0.45)",
                      }}
                    >
                      <span>{formData.service || "Select a service..."}</span>
                      <motion.svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        animate={{ rotate: dropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        aria-hidden="true"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </motion.svg>
                    </motion.div>

                    <AnimatePresence>
                      {dropdownOpen ? (
                        <motion.div
                          initial={{ opacity: 0, scaleY: 0.92, y: -8 }}
                          animate={{ opacity: 1, scaleY: 1, y: 0 }}
                          exit={{ opacity: 0, scaleY: 0.92, y: -8 }}
                          style={{
                            originY: 0,
                            position: "absolute",
                            top: "calc(100% + 6px)",
                            left: 0,
                            right: 0,
                            zIndex: 50,
                            background: "rgba(255,255,255,0.92)",
                            border: "1px solid rgba(167,139,250,0.18)",
                            borderRadius: 12,
                            overflow: "hidden",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
                          }}
                        >
                          {services.map((option) => (
                            <motion.div
                              key={option}
                              whileHover={{ backgroundColor: "rgba(45,212,191,0.12)", x: 4 }}
                              onClick={() => {
                                setFormData((p) => ({ ...p, service: option }));
                                setDropdownOpen(false);
                                setFocused(null);
                              }}
                              style={{
                                padding: "12px 16px",
                                fontFamily: "Inter, sans-serif",
                                fontWeight: 400,
                                fontSize: 13,
                                color: "rgba(26,26,46,0.70)",
                                cursor: "pointer",
                              }}
                            >
                              {option}
                            </motion.div>
                          ))}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>

                    <div
                      style={{
                        position: "absolute",
                        height: 2,
                        bottom: 0,
                        left: 0,
                        background: "linear-gradient(to right, #2DD4BF, #A78BFA)",
                        borderRadius: "0 0 10px 10px",
                        width: focused === "service" ? "100%" : "0%",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>

                  {/* FIELD 4: Message */}
                  <div style={{ position: "relative", marginBottom: 24 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 500,
                          fontSize: 9,
                          color: "rgba(26,26,46,0.42)",
                          letterSpacing: "0.15em",
                        }}
                      >
                        04
                      </span>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 600,
                          fontSize: 9,
                          color: "rgba(26,26,46,0.62)",
                          letterSpacing: "0.20em",
                          textTransform: "uppercase",
                        }}
                      >
                        TELL ME EVERYTHING
                      </span>
                    </div>

                    <motion.textarea
                      whileFocus={{ scale: 1.005 }}
                      rows={5}
                      placeholder="Describe your project, goals, timeline, and budget."
                      value={formData.message}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, message: e.target.value }))
                      }
                      className={cn("resize-y", errors.message ? "field-error" : "")}
                      style={inputStyle("message")}
                    />

                    <div
                      style={{
                        position: "absolute",
                        height: 2,
                        bottom: 0,
                        left: 0,
                        background: "linear-gradient(to right, #2DD4BF, #A78BFA)",
                        borderRadius: "0 0 10px 10px",
                        width: focused === "message" ? "100%" : "0%",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>

                  <div className="mb-7 mt-1">
                    <p
                      className="text-[#8888aa] text-[11px] mb-2.5"
                      style={{ fontFamily: "Inter,sans-serif" }}
                    >
                      Or reach me directly:
                    </p>

                    <div className="flex gap-2 flex-wrap">
                      <motion.a
                        href="https://wa.me/923255629527"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px]",
                          "bg-green-500/10 border border-green-500/20 text-green-400/80",
                          "hover:border-green-400/40 hover:text-green-300 transition-all",
                        )}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297 -.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788 -1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174 .198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579 -.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016 -1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262 .489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248 -1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                        </svg>
                        WhatsApp
                      </motion.a>

                      <motion.a
                        href="mailto:alyanhaider369@gmail.com"
                        whileHover={{ scale: 1.03 }}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px]",
                          "bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 text-[#2DD4BF]/80",
                          "hover:border-[#2DD4BF]/40 hover:text-[#2DD4BF] transition-all",
                        )}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          aria-hidden="true"
                        >
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        Send Email
                      </motion.a>
                    </div>
                  </div>

                  <MovingBorderButton
                    onClick={(e) => void handleSubmit(e)}
                    disabled={sending}
                    duration={1800}
                    borderRadius="0.5rem"
                    className={cn("w-full h-14", sending && "opacity-70")}
                  >
                    {!sending && (
                      <span
                        className="font-bold text-sm tracking-[0.10em] uppercase"
                        style={{ fontFamily: "Poppins,sans-serif" }}
                      >
                        SEND MESSAGE →
                      </span>
                    )}
                    {sending && (
                      <span
                        className="flex items-center gap-3 text-[#2DD4BF] text-sm font-medium"
                        style={{ fontFamily: "Inter,sans-serif" }}
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-[#2DD4BF]/30 border-t-[#2DD4BF] rounded-full"
                        />
                        SENDING...
                      </span>
                    )}
                  </MovingBorderButton>

                  {error ? (
                    <p
                      className="mt-3 text-[12px] text-red-500/80"
                      style={{ fontFamily: "Inter,sans-serif" }}
                    >
                      Something went wrong. Please try WhatsApp or email directly.
                    </p>
                  ) : null}
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.94, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="py-12 flex flex-col items-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 14, delay: 0.1 }}
                    className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-7"
                    style={{
                      background: "rgba(45,212,191,0.10)",
                      border: "1px solid rgba(45,212,191,0.30)",
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                      <motion.path
                        d="M8 16 L14 22 L24 11"
                        stroke="#2DD4BF"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.55, delay: 0.45, ease: "easeInOut" }}
                      />
                    </svg>
                  </motion.div>

                  <h3
                    className="text-[#1a1a2e] font-black mb-3"
                    style={{
                      fontFamily: "Poppins,sans-serif",
                      fontSize: "clamp(1.6rem,3vw,2.3rem)",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    <TextGenerateEffect text="Message sent!" delay={0.2} />
                  </h3>

                  <p
                    className="text-sm leading-relaxed mb-8 max-w-xs"
                    style={{ fontFamily: "Inter,sans-serif" }}
                  >
                    <span style={{ color: "rgba(34,197,94,0.88)" }}>
                      Message sent! I&apos;ll reply within 24h.
                    </span>
                  </p>

                  <motion.svg width="180" height="36" viewBox="0 0 180 36" fill="none" className="mb-8" aria-hidden="true">
                    <defs>
                      <linearGradient id="sig-grad" x1="0" y1="0" x2="180" y2="0" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#2DD4BF" />
                        <stop offset="1" stopColor="#A78BFA" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M 0 18 C 22 0 45 36 90 18 C 135 0 158 36 180 18"
                      stroke="url(#sig-grad)"
                      strokeWidth="1.5"
                      fill="none"
                      strokeDasharray="300"
                      initial={{ strokeDashoffset: 300 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 1.2, delay: 0.55, ease: "easeInOut" }}
                    />
                  </motion.svg>

                  <motion.button
                    whileHover={{ borderColor: "rgba(45,212,191,0.40)", color: "rgba(26,26,46,0.85)" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setFormData({ from_name: "", from_email: "", service: "", message: "" });
                      setSent(false);
                      setError(false);
                      setSending(false);
                      setDropdownOpen(false);
                      setFocused(null);
                    }}
                    className="px-6 py-2.5 rounded-full border border-[rgba(26,26,46,0.14)] text-[#44445a] text-xs font-medium transition-colors"
                    style={{ fontFamily: "Poppins,sans-serif" }}
                    type="button"
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </SpotlightCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7 }}
          className="mt-12"
        >
          <p
            className="text-center text-[#8888aa] text-[9px] tracking-[0.25em] uppercase mb-5"
            style={{ fontFamily: "Inter,sans-serif" }}
          >
            Find Me On
          </p>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {socials.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.label === "Email" ? undefined : "_blank"}
                    rel={item.label === "Email" ? undefined : "noopener noreferrer"}
                    whileHover={{ y: -4, borderColor: "rgba(45,212,191,0.30)" }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-xl",
                  "bg-white/[0.55] border border-[rgba(26,26,46,0.08)] text-[#44445a]",
                  "hover:text-[#2DD4BF] transition-colors no-underline",
                )}
              >
                {item.icon}
                <span
                  className="text-[9px] font-medium"
                  style={{ fontFamily: "Inter,sans-serif", letterSpacing: "0.06em" }}
                >
                  {item.label}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.8 }}
          className="text-center text-[#8888aa] text-[9px] tracking-wide mt-16"
          style={{ fontFamily: "Inter,sans-serif" }}
        >
          © 2025 Alyan Haider · Built with React + Framer Motion + TypeScript
        </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}
