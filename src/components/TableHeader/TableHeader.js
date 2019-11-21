import React from "react";
import Typography from "@material-ui/core/Typography";
import useSharedStyles from "styles/sharedStyles";
import PropTypes from "prop-types";

export default function TableHeader(props) {
  const align = props.align || "left";
  const sharedStyles = useSharedStyles();
  return (
    <Typography
      align={align}
      className={[sharedStyles.textSecondary, sharedStyles.textBold].join(" ")}
    >
      {props.children}
    </Typography>
  );
}

TableHeader.propTypes = {
  children: PropTypes.string
};
