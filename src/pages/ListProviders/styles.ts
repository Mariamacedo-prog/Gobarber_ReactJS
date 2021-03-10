import { shade } from 'polished';

import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  display: flex;
  align-items: center;

  height: 144px;
  text-align: center;
  background: #28262e;

  div {
    width: 100%;
    max-width: 1120px;
    text-align: center;
    align-items: center;

    h1 {
      color: #999591;
    }
    svg {
      color: #999591;
      width: 25px;
      height: 25px;
    }
  }
`;

export const Content = styled.main`
  max-width: 800px;
  margin: 64px auto;
  display: flex;
`;

export const Section = styled.section`
  margin-top: 48px;

  flex: 1;
`;

export const Provider = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    margin-right: 10px;
    }
  }

  div {
    flex: 1;
    display: inline-flex;
    background: #3e3b47;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;

    a {
      text-decoration: none;
    }

    strong {
      color: #fff;
      font-size: 20px;
    }
    span {
      align-items: left;
      text-align: left;

      h1 {
        margin: auto 0;
        display: block;
        font-size: 13px;
        color: #999591;

        svg {
          display: inline-block;
          color: #ff9000;
          width: 13px;
          height: 13px;
          margin-right: 3px;
        }
      }
    }
  }
`;
