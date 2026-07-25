"use client";

import { useEffect } from "react";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smooth(value: number) {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
}

function smoother(value: number) {
  const t = clamp(value);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

export function SwissbrutMotion() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>("[data-swissbrut-page]");
    const hero = document.querySelector<HTMLElement>("[data-hero-motion]");
    const work = document.querySelector<HTMLElement>("[data-work-motion]");
    const workMetaRows = Array.from(document.querySelectorAll<HTMLElement>("[data-work-meta]"));
    const workPanels = Array.from(document.querySelectorAll<HTMLElement>("[data-work-panel]"));
    const services = document.querySelector<HTMLElement>("[data-service-motion]");
    const serviceRows = Array.from(document.querySelectorAll<HTMLElement>("[data-service-row]"));
    const stats = document.querySelector<HTMLElement>("[data-stats-motion]");
    const statItems = Array.from(document.querySelectorAll<HTMLElement>("[data-stat-item]"));
    const people = document.querySelector<HTMLElement>("[data-people-motion]");
    const personCards = Array.from(document.querySelectorAll<HTMLElement>("[data-person-card]"));
    const contact = document.querySelector<HTMLElement>("[data-contact-motion]");
    const contactTrack = document.querySelector<HTMLElement>("[data-contact-track]");
    const contactStage = document.querySelector<HTMLElement>("[data-contact-stage]");
    const contactStatement = document.querySelector<HTMLElement>("[data-contact-statement]");
    const contactImage = document.querySelector<HTMLElement>("[data-contact-image]");
    const contactImageCaption = document.querySelector<HTMLElement>("[data-contact-image-caption]");
    const contactImageSlot = document.querySelector<HTMLElement>("[data-contact-image-slot]");
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-brut-reveal]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!page) {
      return;
    }

    page.dataset.motion = "true";

    if (reduceMotion) {
      page.dataset.loaded = "true";
      revealNodes.forEach((node) => node.classList.add("is-brut-visible"));
      personCards.forEach((card) => {
        card.style.setProperty("--person-card-x", "0vw");
        card.style.setProperty("--person-card-y", "0vh");
        card.style.setProperty("--person-card-rotate-y", "0deg");
        card.style.setProperty("--person-card-scale", "1");
        card.style.setProperty("--person-card-opacity", "1");
        const caption = card.querySelector<HTMLElement>("p");
        caption?.style.setProperty("--person-caption-opacity", "1");
        caption?.style.setProperty("--person-caption-blur", "0px");
        caption?.style.setProperty("--person-caption-y", "0rem");
      });
      contact?.style.setProperty("--contact-footer-y", "0vh");
      contactStatement?.style.setProperty("--contact-statement-x", "0vw");
      contactStatement?.style.setProperty("--contact-statement-y", "0px");
      contactStatement?.style.setProperty("--contact-left-x", "0px");
      contactStatement?.style.setProperty("--contact-right-x", "0px");
      contactImage?.style.setProperty("--contact-image-opacity", "1");
      contactImage?.style.setProperty("--contact-object-y", "34%");
      contactImage?.style.setProperty("--contact-overlay-opacity", "0");
      contactImageCaption?.style.setProperty("--contact-caption-opacity", "0");
      contactImageCaption?.style.setProperty("--contact-caption-blur", "10px");
      contactImageCaption?.style.setProperty("--contact-caption-y", "0.55rem");
      return;
    }

    const loadFrame = window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        page.dataset.loaded = "true";
      }, 90);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-brut-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -16% 0px", threshold: 0.18 }
    );

    revealNodes.forEach((node) => observer.observe(node));

    let frame = 0;

    function update() {
      frame = 0;

      if (hero && window.innerWidth > 900) {
        const rect = hero.getBoundingClientRect();
        const scrollable = Math.max(1, hero.offsetHeight - window.innerHeight);
        const progress = clamp(-rect.top / scrollable);
        const eased = 1 - Math.pow(1 - progress, 3);
        const imageWidth = 50 + eased * 50;
        const panelOpacity = clamp(1 - eased * 1.25);
        const panelY = -eased * 10;

        hero.style.setProperty("--hero-progress", eased.toFixed(3));
        hero.style.setProperty("--hero-image-width", `${imageWidth.toFixed(3)}vw`);
        hero.style.setProperty("--hero-panel-opacity", panelOpacity.toFixed(3));
        hero.style.setProperty("--hero-panel-y", `${panelY.toFixed(3)}vh`);
        hero.dataset.headerTheme = eased > 0.88 ? "dark" : "light";
      } else if (hero) {
        hero.style.removeProperty("--hero-image-width");
        hero.style.removeProperty("--hero-panel-opacity");
        hero.style.removeProperty("--hero-panel-y");
        hero.dataset.headerTheme = "light";
      }

      if (work && workMetaRows.length > 0) {
        const rect = work.getBoundingClientRect();
        const labelY = window.innerHeight * 0.465;
        const switchY = Math.min(4, window.innerHeight * 0.01);
        const isWorkVisible = rect.top < window.innerHeight && rect.bottom > labelY;
        let activeIndex = 0;

        if (workPanels.length > 0) {
          workPanels.forEach((panel, index) => {
            if (panel.getBoundingClientRect().top <= switchY) {
              activeIndex = index;
            }
          });
        } else {
          const panelStep = Math.max(1, work.offsetHeight / workMetaRows.length);
          activeIndex = Math.round(clamp(-rect.top / panelStep, 0, workMetaRows.length - 1));
        }

        work.style.setProperty("--work-active", activeIndex.toFixed(3));

        workMetaRows.forEach((row, index) => {
          const opacity = isWorkVisible && index === activeIndex ? 1 : 0;

          row.style.setProperty("--work-meta-opacity", opacity.toFixed(3));
          row.style.setProperty("--work-meta-y", "0rem");
          row.dataset.state = isWorkVisible && index === activeIndex ? "active" : index < activeIndex ? "before" : "after";
        });
      }

      if (stats && statItems.length > 0) {
        if (window.innerWidth > 900) {
          const rect = stats.getBoundingClientRect();
          const travel = Math.max(1, stats.offsetHeight - window.innerHeight);
          const progress = clamp(-rect.top / travel);
          const exitLift = lerp(0, -18, smoother((progress - 0.74) / 0.18));

          statItems.forEach((item, index) => {
            const start = [-0.08, 0.24, 0.52][index] ?? 0;
            const duration = [0.22, 0.24, 0.18][index] ?? 0.24;
            const distance = [30, 58, 58][index] ?? 58;
            const itemProgress = smooth((progress - start) / duration);
            const y = (1 - itemProgress) * distance;

            item.style.setProperty("--stat-opacity", "1");
            item.style.setProperty("--stat-y", `${y.toFixed(3)}vh`);
            item.style.setProperty("--stat-number-y", `${exitLift.toFixed(3)}vh`);
            item.style.setProperty("--stat-line-y", `${exitLift.toFixed(3)}vh`);
          });
        } else {
          statItems.forEach((item) => {
            item.style.setProperty("--stat-opacity", "1");
            item.style.setProperty("--stat-y", "0vh");
            item.style.setProperty("--stat-number-y", "0vh");
            item.style.setProperty("--stat-line-y", "0vh");
          });
        }
      }

      if (services && serviceRows.length > 0) {
        const rect = services.getBoundingClientRect();
        const travel = Math.max(1, rect.height - window.innerHeight);
        const progress = clamp(-rect.top / travel);
        const activeFloat = progress * (serviceRows.length - 1);
        const activeIndex = Math.round(activeFloat);

        services.style.setProperty("--service-active", activeFloat.toFixed(3));

        serviceRows.forEach((row, index) => {
          const offset = index - activeFloat;
          const distance = Math.abs(offset);
          const opacity = clamp(1 - distance * 0.46, 0.12, 1);

          row.style.setProperty("--service-y", `${(offset * 30).toFixed(3)}vh`);
          row.style.setProperty("--service-scale", (1 - Math.min(distance, 1) * 0.035).toFixed(3));
          row.style.setProperty("--service-opacity", opacity.toFixed(3));
          row.dataset.state = index === activeIndex ? "active" : index < activeIndex ? "before" : "after";
        });
      }

      if (people && personCards.length > 0) {
        const rect = people.getBoundingClientRect();
        const travel = Math.max(1, people.offsetHeight - window.innerHeight);
        const progress = clamp(-rect.top / travel);
        const enter = smoother(progress / 0.2);
        const cardScale = 1;
        const cardY = lerp(10, 0, enter);

        people.style.setProperty("--people-progress", progress.toFixed(3));
        people.style.setProperty("--person-stage-opacity", "1");

        personCards[0].parentElement?.style.setProperty("--person-card-y", `${cardY.toFixed(3)}vh`);
        personCards[0].style.zIndex = "5";
        personCards[0].style.setProperty("--person-card-x", "0vw");
        personCards[0].style.setProperty("--person-card-y", `${cardY.toFixed(3)}vh`);
        personCards[0].style.setProperty("--person-card-rotate-y", "0deg");
        personCards[0].style.setProperty("--person-card-scale", cardScale.toFixed(3));
        personCards[0].style.setProperty("--person-card-opacity", "1");
        const caption = personCards[0].querySelector<HTMLElement>("p");
        caption?.style.setProperty("--person-caption-opacity", "1");
        caption?.style.setProperty("--person-caption-blur", "0px");
        caption?.style.setProperty("--person-caption-y", "0rem");
      }

      if (contact && contactTrack && contactStage && contactStatement && contactImage && contactImageSlot) {
        const rect = contactTrack.getBoundingClientRect();
        const travel = Math.max(1, contactTrack.offsetHeight - window.innerHeight);
        const progress = clamp(-rect.top / travel);
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const isMobile = viewportWidth <= 520;
        const isTablet = viewportWidth <= 900 && !isMobile;
        const stageRect = contactStage.getBoundingClientRect();
        const startW = isMobile
          ? viewportWidth * 0.82
          : isTablet
            ? Math.min(viewportWidth * 0.56, 480)
            : Math.min(viewportWidth * 0.34, 480);
        const startH = startW * (1108 / 960);
        const largeW = startW;
        const largeH = startH;
        const leftWord = contactImageSlot.previousElementSibling as HTMLElement | null;
        const rightWord = contactImageSlot.nextElementSibling as HTMLElement | null;
        const balanceX = leftWord && rightWord ? (rightWord.offsetWidth - leftWord.offsetWidth) / 2 : 0;
        const sideDistance = viewportWidth * (isMobile ? 0.62 : isTablet ? 0.56 : 0.5);
        const fixedTop = viewportHeight * 0.5 - startH / 2;
        const handoffDistance = Math.max(1, fixedTop + travel * (isMobile ? 0.68 : isTablet ? 0.7 : 0.72));
        const handoffProgress = clamp((fixedTop - rect.top) / handoffDistance);
        const contactEase = smoother(handoffProgress);
        const captionExit = smoother((handoffProgress - 0.02) / 0.22);
        const handoffOpacity = smoother(handoffProgress / 0.12);
        const morph = smoother((handoffProgress - 0.02) / 0.7);
        const wordProgress = smoother((handoffProgress + 0.01) / 0.68);
        const statementX = balanceX;
        const statementY = -stageRect.top;
        const stageCenterX = viewportWidth * 0.5 - stageRect.left;
        const stageCenterY = viewportHeight * 0.5 - stageRect.top;

        contactStatement.style.setProperty("--contact-statement-x", `${statementX.toFixed(3)}px`);
        contactStatement.style.setProperty("--contact-statement-y", `${statementY.toFixed(3)}px`);
        contactStatement.style.setProperty("--contact-left-x", `${lerp(-sideDistance, 0, wordProgress).toFixed(3)}px`);
        contactStatement.style.setProperty("--contact-right-x", `${lerp(sideDistance, 0, wordProgress).toFixed(3)}px`);

        const smallW = contactImageSlot.offsetWidth;
        const smallH = contactImageSlot.offsetHeight;
        const imageW = lerp(largeW, smallW, morph);
        const imageH = lerp(largeH, smallH, morph);
        const imageX = stageCenterX - imageW / 2;
        const imageY = stageCenterY - imageH / 2;
        const imageIsLive = handoffProgress > 0 || progress > 0.001;

        if (imageIsLive && people && personCards.length > 0) {
          const nextCaptionOpacity = 1 - captionExit;
          const stageOpacity = 1 - handoffOpacity;

          people.style.setProperty("--person-stage-opacity", stageOpacity.toFixed(3));
          const caption = personCards[0].querySelector<HTMLElement>("p");

          if (caption) {
            caption.style.setProperty("--person-caption-opacity", nextCaptionOpacity.toFixed(3));
            caption.style.setProperty("--person-caption-blur", `${lerp(0, 10, captionExit).toFixed(3)}px`);
            caption.style.setProperty("--person-caption-y", `${lerp(0, 0.55, captionExit).toFixed(3)}rem`);
          }
        }

        contact.style.setProperty("--contact-footer-y", "0vh");
        contactImage.style.setProperty("--contact-image-opacity", imageIsLive ? contactEase.toFixed(3) : "0");
        contactImage.style.setProperty("--contact-image-x", `${imageX.toFixed(3)}px`);
        contactImage.style.setProperty("--contact-image-y", `${imageY.toFixed(3)}px`);
        contactImage.style.setProperty("--contact-image-w", `${imageW.toFixed(3)}px`);
        contactImage.style.setProperty("--contact-image-h", `${imageH.toFixed(3)}px`);
        contactImage.style.setProperty("--contact-object-y", `${lerp(48, 34, morph).toFixed(3)}%`);
        contactImage.style.setProperty("--contact-overlay-opacity", `${(1 - morph).toFixed(3)}`);
        contactImageCaption?.style.setProperty("--contact-caption-opacity", `${(imageIsLive ? 1 - captionExit : 0).toFixed(3)}`);
        contactImageCaption?.style.setProperty("--contact-caption-blur", `${lerp(0, 10, captionExit).toFixed(3)}px`);
        contactImageCaption?.style.setProperty("--contact-caption-y", `${lerp(0, 0.55, captionExit).toFixed(3)}rem`);
      }
    }

    function scheduleUpdate() {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(loadFrame);
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return null;
}
