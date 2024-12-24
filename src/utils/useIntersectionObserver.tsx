import { useEffect, useState, useRef } from 'react';

// 사용 법
// ref 를 담을 곳에 elementRef 를 담고 스타일을 추가합시다.
// 예시 : <SideBarContainer ref={elementRef} style={{ opacity: isVisible ? 1 : 0 }}>
// 추가로 component css 속성에 transition: opacity 0.5s ease-in-out; 를 추가하면 fadeIn 효과 완성

const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ref = elementRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      options
    );

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [options]);

  return { isVisible, elementRef };
};

export default useIntersectionObserver;