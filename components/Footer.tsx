import React from "react";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <div className="p-8 w-full">
      <div className="grid grid-cols-4 gap-8 mb-8">
        <div className="flex flex-col gap-2 col-span-2">
          <Logo />
          <span className="text-[var(--logo-color)] opacity-70">
            hello@unbody.io
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold mb-2">Company</h3>
          <a href="/about" className="hover:opacity-70">
            About
          </a>
          <a href="/pricing" className="hover:opacity-70">
            Pricing
          </a>
          <a href="/xbody" className="hover:opacity-70">
            Xbody
          </a>
          <a href="/faq" className="hover:opacity-70">
            FAQ
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold mb-2">Contact</h3>
          <a
            href="https://linkedin.com"
            target="_blank"
            className="hover:opacity-70"
          >
            LinkedIn
          </a>
          <a href="https://x.com" target="_blank" className="hover:opacity-70">
            X
          </a>
          <a
            href="https://github.com"
            target="_blank"
            className="hover:opacity-70"
          >
            Github
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            className="hover:opacity-70"
          >
            YouTube
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            className="hover:opacity-70"
          >
            Discord
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold mb-2">Resources</h3>
          <a href="/documentation" className="hover:opacity-70">
            Documentation
          </a>
          <a href="/blog" className="hover:opacity-70">
            Blog
          </a>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t border-[var(--logo-color)] opacity-70">
        <span>©2024 Unbody</span>
        <div className="flex gap-2">
          <a href="/terms" className="hover:opacity-70">
            Terms
          </a>
          <span>·</span>
          <a href="/privacy" className="hover:opacity-70">
            Privacy
          </a>
        </div>
      </div>
    </div>
  );
};
