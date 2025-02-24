import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);


            ScrollTrigger.create({
            markers: true,
            start: "top 10%",
            trigger: ".concept",
            toggleClass: { targets: "ul", className: "ulact" },
        })


const tl = gsap.timeline();
        tl.to(".logo",{
            opacity: 1,
            duration: 2,
            stagger: 1,
           
        });
        tl.to(".logo",{
            opacity: 0,
            duration: .5,
            stagger: 1,
            delay:1,
        
            /*fontSize: "15px",
            position: "absolute",
            height: "100px",
            width: "150px",
            duration: 1.5,
            delay: 1*/
        });
        tl.to(".txt ",{
            opacity: 1,
            duration: 1,
            stagger: .9,
        });
        tl.to(".txt",{
            opacity: 0,
            duration: .5,
            stagger: .1,
            delay:1,
            
        });
        tl.to(".ul ,.header",{
            opacity: 1,
            duration: .5,
            stagger: .1,
            
        });
        tl.to(".item img",{
            opacity: .4,
            ease:"power2.in",
            duration: 2,
            top: 0,
            stagger: .3,
        });
        tl.to(".concept",{
            opacity: 1,
            ease:"power2.in",
            
        });