import { Box, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { registerLocale, CalendarContainer } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);

interface Props {
  className?: string;
  children?: any;
}

const Wrapper = styled.div`
  font-family: "Poppins", sans-serif;
  .react-datepicker__time-list {
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .react-datepicker__time {
    border-radius: 0 0 20px 0;
  }
  .react-datepicker__time-list:last-child {
    border-radius: 0 0 20px 0;
  }
  .react-datepicker__navigation {
    top: 7px;
  }
  .react-datepicker__day--selected {
    border-radius: 100%;
  }
  .react-datepicker__day:hover {
    border-radius: 100%;
  }
  .react-datepicker-time__header {
    color: transparent;
  }
  .react-datepicker-time__header:after {
    content: "Hora";
    color: black;
    padding: 8px;
    white-space: nowrap;
    font-size: 0.944rem;
    text-overflow: ellipsis;
    font-weight: bold;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  .react-datepicker__day--keyboard-selected {
    border-radius: 100%;
  }

  @media (max-width: 768px) {
    .react-datepicker__day,
    .react-datepicker__day-name {
      width: 1.2rem;
      line-height: 1.2rem;
    }
    .react-datepicker__time-container {
      width: 6rem;
      height: 12.5rem;
    }
    .react-datepicker__time .react-datepicker__time-box {
      width: 6rem;
      height: 10rem;
    }
  }
`;

const Calendar: React.FC<Props> = ({ className, children }) => {
  return (
    <Wrapper>
      <Box
        as={CalendarContainer}
        border="none"
        boxShadow="lg"
        className={className}
        fontFamily="Poppins"
        rounded="20px"
      >
        <Text
          bg="#f0f0f0"
          borderRadius="20px 20px 0 0 "
          fontFamily="Poppins"
          fontSize={13}
          fontWeight={500}
          textAlign="center"
        >
          Selecciona una fecha
        </Text>
        {children}
      </Box>
    </Wrapper>
  );
};

export default Calendar;
