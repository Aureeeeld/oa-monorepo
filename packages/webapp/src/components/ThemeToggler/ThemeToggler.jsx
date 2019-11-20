import React from "react";
import { useDispatch, useSelector } from "react-redux";

// * Store
import { swapThemeMode } from "../../store/ducks/theme";

// * Styled components
import {
  ToggleWrapper,
  ToggleInput,
  ToggleLabel,
  ToggleHandler,
  Crater1,
  Crater2,
  Crater3,
  Star1,
  Star2,
  Star3
} from "./styled";

const ThemeToggler = () => {
  // * Dispatch
  const dispatch = useDispatch();

  // * Selectors
  const mode = useSelector(({ theme }) => theme.mode);

  return (
    <ToggleWrapper>
      <ToggleInput
        type="checkbox"
        className="theme"
        id="theme"
        checked={mode === "dark"}
        onChange={() => dispatch(swapThemeMode())}
      />
      <ToggleLabel htmlFor="theme">
        <ToggleHandler>
          <Crater1 />
          <Crater2 />
          <Crater3 />
        </ToggleHandler>
        <Star1 />
        <Star2 />
        <Star3 />
      </ToggleLabel>
    </ToggleWrapper>
  );
};

export default ThemeToggler;
