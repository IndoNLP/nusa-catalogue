import { useEffect, useRef, useState } from "react";

import type { RefObject } from "react";

type State = {
  isIntersecting: boolean;
  entry?: IntersectionObserverEntry;
};

type ObserverCallback = (
  isIntersecting: boolean,
  entry: IntersectionObserverEntry
) => void;

interface IntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
  onChange?: ObserverCallback;
  initialIsIntersecting?: boolean;
}

/** Supports both array and object destructing */
type IntersectionResult = [
  (node?: Element | null) => void,
  boolean,
  IntersectionObserverEntry | undefined
] & {
  ref: (node?: Element | null) => void;
  isIntersecting: boolean;
  entry?: IntersectionObserverEntry;
};

export function useIntersectionObserver(
  options: IntersectionObserverOptions
): IntersectionResult;

export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  legacyOptions: IntersectionObserverOptions
): IntersectionObserverEntry | undefined;

export function useIntersectionObserver(
  optionsOrLegacyRef: IntersectionObserverOptions | RefObject<Element>,
  legacyOptions?: IntersectionObserverOptions
): IntersectionResult | IntersectionObserverEntry | undefined {
  // TODO: Remove this mess when the old signature is removed.
  const isLegacySignature = "current" in optionsOrLegacyRef;
  const options = isLegacySignature ? legacyOptions : optionsOrLegacyRef;
  const {
    threshold = 0,
    root = null,
    rootMargin = "0%",
    freezeOnceVisible = false,
    initialIsIntersecting = false,
  } = options ?? {};

  const [newRef, setNewRef] = useState<Element | null>(null);
  const ref = isLegacySignature ? optionsOrLegacyRef.current : newRef;

  const [state, setState] = useState<State>(() => ({
    isIntersecting: initialIsIntersecting,
    entry: undefined,
  }));

  const callbackRef = useRef<ObserverCallback>();

  callbackRef.current = options?.onChange;

  const frozen = state.entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    // Ensure we have a ref to observe
    if (!ref) return;

    // Ensure the browser supports the Intersection Observer API
    if (!("IntersectionObserver" in window)) return;

    // Skip if frozen
    if (frozen) return;

    let unobserve: (() => void) | undefined;

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => {
        const thresholds = Array.isArray(observer.thresholds)
          ? observer.thresholds
          : [observer.thresholds];

        entries.forEach((entry) => {
          const isIntersecting =
            entry.isIntersecting &&
            thresholds.some(
              (threshold) => entry.intersectionRatio >= threshold
            );

          setState({ isIntersecting, entry });

          if (callbackRef.current) {
            callbackRef.current(isIntersecting, entry);
          }

          if (isIntersecting && freezeOnceVisible && unobserve) {
            unobserve();
            unobserve = undefined;
          }
        });
      },
      { threshold, root, rootMargin }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    ref,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(threshold),
    root,
    rootMargin,
    frozen,
    freezeOnceVisible,
  ]);

  // ensures that if the observed element changes, the intersection observer is reinitialized
  const prevRef = useRef<Element | null>(null);

  useEffect(() => {
    if (
      !ref &&
      state.entry?.target &&
      !freezeOnceVisible &&
      !frozen &&
      prevRef.current !== state.entry.target
    ) {
      prevRef.current = state.entry.target;
      setState({ isIntersecting: initialIsIntersecting, entry: undefined });
    }
  }, [ref, state.entry, freezeOnceVisible, frozen, initialIsIntersecting]);

  if (isLegacySignature) {
    return state.entry;
  }

  const result = [
    setNewRef,
    !!state.isIntersecting,
    state.entry,
  ] as IntersectionResult;

  // Support object destructuring, by adding the specific values.
  result.ref = result[0];
  result.isIntersecting = result[1];
  result.entry = result[2];

  return result;
}
