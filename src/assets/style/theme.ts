import { ITheme } from "common/interfaces/styled";

export const theme: ITheme = {
    colors: {
        darkGrey: "#303030",
        grey: "#707070",
        lightGrey: "#9C9C9C",
        lightestGrey: "#D1D1D1",
        lightestGrey1: "#F6F6F6",
        darkRed: "#C60E2E",
        red: "#E4163A",
        lightRed: "#FF5761",
        lightestRed: "#FF768E",
        lightBlue: "#F5FBFF",
        blue: "#344472",
        white:"#FFFFFF",
    },
    fontSizes:{
        smallest:'12px',
        small:'14px',
        medium:'18px',
        big:'24px',
        biggest:'33px',
    },
    lineHeight:{
        smallest:'18px',
        small:'24px',
        medium:'25px',
        big:'33px',
        biggest:'49px',        
    },
    fontWeight:{
        normal:400,
        medium:500,
        bold:800,
    },
    media: {
        mobileS: '(max-width:320px)',
        mobileM: '(max-width:375px)',
        mobileL: '(max-width:425px)',
        mobileXL:'(max-width:587px)',
        tablet: '(max-width:768px)',
        laptop: '(max-width:1024px)',
        laptopM:'(max-width:1280px)',
        laptopL: '(max-width:1440px)',
        desktop: '(max-width:2560px)'
    }
};

