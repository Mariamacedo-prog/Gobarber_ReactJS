import { shade } from 'polished';

import styled from 'styled-components';

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTitleProps {
  selected: boolean;
}

export const Content = styled.div`
  display: inline-flex;
  max-width: 1120px;
`;

export const Schedule = styled.div`
  display: block;
`;

export const Section = styled.div`
  margin-bottom: 24px;
`;
export const SectionTitle = styled.text`
  font-size: 24px;
  color: #999591;
  font-family: 'RobotoSlab';
`;
export const SectionContent = styled.div``;

export const HourTitle = styled.text<HourTitleProps>`
  color: ${props => (props.selected ? '#232129' : '#f4ede8')};
  font-family: 'RobotoSlab';
  font-size: 18px;
`;

export const Hour = styled.button<HourProps>`
  padding: 10px;
  margin-bottom: 5px;
  background: ${props => (props.selected ? '#ff9000' : '#3e3b47')};
  border-radius: 10px;
  margin-right: 8px;

  opacity: ${props => (props.available ? 1 : 0.3)};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  > header {
    height: 144px;
    display: flex;
    text-align: center;
    align-items: center;
    background: #28262e;

    div {
      width: 100%;
      max-width: 1120px;
      margin-right: 198px;
      text-align: center;
      align-items: center;
      svg {
        color: #999591;
        width: 25px;
        height: 25px;
      }
    }
  }
`;

export const ButtonContainer = styled.div`
  margin: 0 auto;

  Button {
    width: 300px;
    margin-left: 70px;
  }
`;

export const HeaderTitle = styled.h1`
  font-size: 30px;
  color: #999591;
  text-align: center;
  margin-right: 410px;

  h1 {
    font-size: 30px;
    margin-right: 40px;
  }
`;

export const Title = styled.h1`
  font-family: 'RobotoSlab';
  color: #f4edef;
  font-size: 24px;
  margin: 0 12px 24px;
`;

export const Calendar = styled.div`
  width: 360px;
  margin: 0 auto;
  display: block;
  margin-right: 50px;
  .DayPicker {
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #3e3b47;
    border-radius: 10px;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #999591 !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px 0 0 0;
    padding: 16px;
    background-color: #28262e;
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1em;
    padding: 0 1em;
    color: #f4ede8;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
