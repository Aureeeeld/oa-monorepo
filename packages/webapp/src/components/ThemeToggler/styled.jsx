import styled from "styled-components";
import tw from "tailwind.macro";

const Crater = styled.span`
  ${tw`absolute bg-yellow-600 opacity-0 rounded-full`}

  transition: opacity 200ms ease-in-out;
`;

export const Crater1 = styled(Crater)`
  top: 8px;
  left: 5px;
  width: 3px;
  height: 3px;
`;

export const Crater2 = styled(Crater)`
  top: 14px;
  left: 11px;
  width: 4px;
  height: 4px;
`;

export const Crater3 = styled(Crater)`
  top: 5px;
  left: 17px;
  width: 5px;
  height: 5px;
`;

const Star = styled.span`
  ${tw`absolute bg-white`}

  transition: all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  border-radius: 50%;
`;

export const Star1 = styled(Star)`
  top: 8px;
  left: 25px;
  z-index: 0;
  width: 30px;
  height: 3px;
`;

export const Star2 = styled(Star)`
  top: 16px;
  left: 23px;
  z-index: 11;
  width: 30px;
  height: 3px;
`;

export const Star3 = styled(Star)`
  top: 25px;
  left: 25px;
  z-index: 0;
  width: 30px;
  height: 3px;
`;

export const ToggleHandler = styled.span`
  ${tw`inline-block relative z-10 bg-yellow-500 w-8 h-8 align-middle rounded-full`}

  top: 3px;
  left: 3px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: all 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform: rotate(-45deg);
`;

export const ToggleLabel = styled.label`
  ${tw`cursor-pointer inline-block w-20 h-10 bg-blue-300`}

  border-radius: 90px;
  transition: background-color 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
`;

export const ToggleInput = styled.input`
  ${tw`absolute`}
  left: -999em;

  &:checked + ${ToggleLabel} {
    background-color: #2c5282;

    ${ToggleHandler} {
      background-color: #fbd38d;
      transform: translate3d(35px, 0, 0) rotate(0);
    }

    ${Crater} {
      opacity: 1;
    }

    ${Star1} {
      width: 2px;
      height: 2px;
    }

    ${Star2} {
      width: 4px;
      height: 4px;
      transform: translate3d(-5px, 0, 0);
    }

    ${Star3} {
      width: 2px;
      height: 2px;
      transform: translate3d(-7px, 0, 0);
    }
  }
`;

export const ToggleWrapper = styled.div`
  ${tw`relative`}
  margin-left: 4rem;
`;
