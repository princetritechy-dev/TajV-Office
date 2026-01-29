"use client";

import { useEffect } from "react";

export default function ClientInteractions() {
  // Mobile nav
  useEffect(() => {
    const toggle = document.querySelector<HTMLButtonElement>(".nav-toggle");
    const nav = document.querySelector<HTMLElement>(".site-nav");

    if (!toggle || !nav) return;

    const openNav = () => {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    };

    const closeNav = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    const onToggleClick = (e: MouseEvent) => {
      e.stopPropagation();
      const isOpen = nav.classList.contains("is-open");
      isOpen ? closeNav() : openNav();
    };

    const onDocumentClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;

      const inside = nav.contains(t) || toggle.contains(t);
      if (!inside && nav.classList.contains("is-open")) closeNav();
    };

    const onNavLinkClick = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      // close when any <a> inside nav is clicked
      const a = t.closest("a");
      if (a) closeNav();
    };

    toggle.addEventListener("click", onToggleClick);
    document.addEventListener("click", onDocumentClick);
    nav.addEventListener("click", onNavLinkClick);

    return () => {
      toggle.removeEventListener("click", onToggleClick);
      document.removeEventListener("click", onDocumentClick);
      nav.removeEventListener("click", onNavLinkClick);
    };
  }, []);

  // FAQ (single-open accordion)
  useEffect(() => {
    const onFaqClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement | null)?.closest<HTMLButtonElement>(".faq-q");
      if (!btn) return;

      const expanded = btn.getAttribute("aria-expanded") === "true";
      const allBtns = Array.from(document.querySelectorAll<HTMLButtonElement>(".faq-q"));

      // close all
      allBtns.forEach((b) => {
        b.setAttribute("aria-expanded", "false");
        const a = b.nextElementSibling as HTMLElement | null;
        if (a) a.hidden = true;
      });

      // open clicked if it was closed
      if (!expanded) {
        btn.setAttribute("aria-expanded", "true");
        const answer = btn.nextElementSibling as HTMLElement | null;
        if (answer) answer.hidden = false;
      }
    };

    document.addEventListener("click", onFaqClick);
    return () => document.removeEventListener("click", onFaqClick);
  }, []);

  return null;
}