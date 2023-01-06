import styled from "styled-components";

export const CLASS_PREFIX = "btn";

export const StyledButton = styled.button`
  &.${CLASS_PREFIX} {
    --vertical-padding: ${(props) => props.theme.spacingTiny}px;
    --horizontal-padding: ${(props) => props.theme.spacingNormal - 1}px;
    --height: 32px;
    background-color: ${(props) => props.theme.background};
    border: 1px solid transparent;
    box-shadow: ${(props) => props.theme.shadow};
    font-size: ${(props) => props.theme.fontSize};
    padding: var(--vertical-padding) var(--horizontal-padding);
    border-radius: 2px;
    font-weight: 400;
    color: ${(props) => props.theme.textColorPrimary};
    height: var(--height);
    font-family: inherit;

    :hover {
      cursor: pointer;
    }

    > :not(:first-child) {
      margin-left: ${(props) => props.theme.spacingSmall}px;
    }

    &-small {
      --horizontal-padding: ${(props) => props.theme.spacingSmaller - 1}px;
      --vertical-padding: 0px;
      --height: 24px;
    }

    &-large {
      --horizontal-padding: ${(props) => props.theme.spacingSmaller}px;
      --height: 40px;
      font-size: medium;
    }

    &-dashed,
    &-default {
      border-color: ${(props) => props.theme.textColorPrimary};
      :not(:disabled):hover {
        color: ${(props) => props.theme.controlColorHovered};
        border-color: ${(props) => props.theme.controlColorHovered};
      }
      &.${CLASS_PREFIX}-danger {
        color: ${(props) => props.theme.negative500};
        border-color: ${(props) => props.theme.negative500};

        :not(:disabled):hover {
          color: ${(props) => props.theme.negative400};
          border-color: ${(props) => props.theme.negative400};
        }
      }
    }

    &-dashed {
      border-style: dashed;
    }

    &-primary {
      background-color: ${(props) => props.theme.primary500};
      :not(:disabled):hover {
        background-color: ${(props) => props.theme.primary400};
      }
      &.${CLASS_PREFIX}-danger {
        background-color: ${(props) => props.theme.negative500};
        :not(:disabled):hover {
          background-color: ${(props) => props.theme.negative400};
        }
      }
    }

    &-link {
      color: ${(props) => props.theme.primary500};
      :not(:disabled):hover {
        color: ${(props) => props.theme.primary400};
      }
    }
    &-text {
      :not(:disabled):hover {
        color: ${(props) => props.theme.controlColorHovered};
        background-color: ${(props) => props.theme.backgroundAlt};
      }
    }
    &-link,
    &-text {
      box-shadow: none;
      background-color: inherit;
      &.${CLASS_PREFIX}-danger {
        color: ${(props) => props.theme.negative500};
        :not(:disabled):hover {
          color: ${(props) => props.theme.negative400};
        }
      }
    }

    &-dashed,
    &-default,
    &-primary {
      &.${CLASS_PREFIX}-disabled {
        background-color: ${(props) => props.theme.controlColorDisabled};
        border-color: ${(props) => props.theme.textColorDisabled};
      }
    }

    &-dashed,
    &-default,
    &-primary,
    &-link,
    &-text {
      &.${CLASS_PREFIX}-disabled {
        color: ${(props) => props.theme.textColorDisabled};
      }
    }

    &-disabled {
      :hover {
        cursor: not-allowed;
      }
    }

    &-circle {
      border-radius: 50%;
      padding-inline-start: 0;
      padding-inline-end: 0;
      min-width: var(--height);
    }

    &-round {
      padding-inline-start: calc(var(--height) / 2);
      padding-inline-end: calc(var(--height) / 2);
      width: auto;
      border-radius: var(--height);
    }
  }
`;
