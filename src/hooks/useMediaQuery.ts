import { useEffect, useState } from "react";

export default function useMediaQuery(query: string) {
  const mediaQueryListHookScope = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaQueryListHookScope.matches);
  useEffect(() => {
    /**
     * Don't use the MediaQueryList object created in the
     * top-level hook scope here, instead create a new one every time the effect runs.
     * Using the top-level object would presumably force the browser to keep a reference to every
     * instance of the hook function for every time the hook runs.
     */
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    mediaQueryList.addEventListener("change", listener);
    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}
