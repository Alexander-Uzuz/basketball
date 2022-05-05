import { useState, FC } from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import {ReactComponent as LeftArrow} from 'assets/icons/leftArrow.svg';
import {ReactComponent as RightArrow} from 'assets/icons/rightArrow.svg';


interface Props{
  initialPage?: number;
  pageCount: number;
  onChange?: ({ selected }: { selected: number }) => void
}

export const Paginate:FC<Props> = ({initialPage,pageCount,onChange}) => {


  return (
    <MyPaginate
      initialPage={initialPage}
      pageCount={pageCount}
      onPageChange={onChange}
      pageRangeDisplayed={4}
      marginPagesDisplayed={1}
      previousLabel={<LeftArrow/>}
      nextLabel={<RightArrow/>}
    />
  );
};



export const MyPaginate = styled(ReactPaginate).attrs({
    activeClassName: "active",
  })`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    list-style-type: none;
    /* padding: 0 5rem; */
    li a {
      width:40px;
      height:40px;
      display:inline-flex;
      justify-content:center;
      align-items:center;
      border-radius: 4px;
      cursor: pointer;
      margin-right:16px;

      @media ${({theme}) => theme.media.tablet}{
        width:28px;
        height:28px;
      }
    }
    /* li.previous a,
    li.next a,
    li.break a {
      border-color: transparent;
    } */
    li.active a {
      background-color: var(--red);
      border-color: transparent;
      color: white;
      min-width: 32px;
    }
    li.disabled a {
      color: grey;
    }
    li.disable,
    li.disabled a {
      cursor: default;
    }
  `;
  