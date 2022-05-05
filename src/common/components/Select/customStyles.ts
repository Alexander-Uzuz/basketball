import { StylesConfig } from 'react-select';

export const customStyles: StylesConfig<any> = {
    option: (provided, state) => ({
      ...provided,
      width: "100%",
      height:'37px',
      color: "#9C9C9C",
      fontFamily: "Avenir",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "24px",
      borderBottom: "0.5px solid #9C9C9C",
      cursor: "pointer",
      backgroundColor:'white',
      ":hover":{
          backgroundColor:'#C60E2E',
          color:'#FFFFFF',
      },
      ":active":{
        background:'#9C9C9C',
      },
      "::selection":{
        backgroundColor:'#C60E2E',
        color:'#FFFFFF',
    }
    }),
    control: (styles, state) => ({ 
        ...styles, 
        // width: "364px", 
        height: "38px",
        // background: '#F6F6F6',
        ":active":{
            border:"none"
        },
    }),
    container: (styles, state) => ({ 
      ...styles, 
      height:"40px",
      marginBottom:'0px',
      // backgroundColor:'white'
    }),
    menu: (styles) => ({
        ...styles,
        border: "0.5px solid #D1D1D1",
        // margin: "3px 0 0 0"
      }),
      menuList: (styles) => ({
        ...styles,
      }),
      multiValue: (styles) => ({
        ...styles,
        fontSize: "14px",
        lineHeight: "19px",
        backgroundColor: "#C60E2E",
        borderRadius: '4px',
      }),
      multiValueLabel: (styles) => ({
        ...styles,
        color: "white",
      }),
      multiValueRemove:(styles) => ({
        ...styles,
        color:'white',
        cursor:'pointer',
      }),
      placeholder:(styles) => ({
        ...styles,
        fontWeight:'500',
        fontSize: '15px',
        lineHeight: '24px',
        color: '#707070',
      })
  };