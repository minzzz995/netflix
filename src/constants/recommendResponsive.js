const recommendResponsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8, // 한 줄에 8개씩 표시
      slidesToSlide: 3, // 한번에 넘길 슬라이드 개수
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4, // 한 줄에 4개씩 표시
      slidesToSlide: 2, 
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2, // 한 줄에 2개씩 표시
      slidesToSlide: 1, 
    }
  };
  
  export default recommendResponsive;
  