import { useEffect, useMemo } from "react";

export default function useLazyLoading(dependencies = []) {
  const observer = useMemo(
    () =>
      new IntersectionObserver(
        (entry) =>
          entry.forEach((item) => {
            if (item.isIntersecting) {
              const img = item.target;
              const lazzy = img.getAttribute("lazy");
              img.setAttribute("src", lazzy);
              img.removeAttribute("lazy");
              observer.unobserve(item.target);
            }
          }),
        {
          rootMargin: "50px",
        }
      ),
    []
  );

  useEffect(() => {
    const images = document.querySelectorAll("img[lazy]");
    images.forEach((img) => {
      observer.observe(img);
    });

    return () => {
      images.forEach((img) => observer.unobserve(img));
    };
  }, [...dependencies]);
}
