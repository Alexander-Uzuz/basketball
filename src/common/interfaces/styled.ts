export interface ITheme {
    colors: {
        darkGrey: string;
        grey: string;
        lightGrey: string;
        lightestGrey: string;
        lightestGrey1: string;
        darkRed: string;
        red: string;
        lightRed: string;
        lightestRed: string;
        lightBlue: string;
        blue: string;
        white:string;
    },
    fontSizes:{
        smallest:string;
        small:string;
        medium:string;
        big:string;
        biggest:string;
    },
    lineHeight:{
        smallest:string;
        small:string;
        medium:string;
        big:string;
        biggest:string;
    },
    fontWeight:{
        normal:number,
        medium:number,
        bold:number,
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
}

