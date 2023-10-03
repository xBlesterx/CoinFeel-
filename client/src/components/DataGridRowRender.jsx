import { Box, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const Name = ({ image, name, symbol }) => (
  <Box style={{ display: "flex", alignItems: "center" }}>
    <Box
      component="img"
      src={image}
      alt={name}
      style={{ width: 32, height: 32, marginRight: 10 }}
    />
    <Box>
      <Typography sx={{ fontSize: 18 }}>{name}</Typography>
      <Typography sx={{ fontSize: 15, fontWeight: "bold" }}>
        {symbol}
      </Typography>
    </Box>
  </Box>
);
const PriceChange = ({ price }) => (
  <Box>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {price > 0 ? (
        <ArrowDropUpIcon sx={{ fontSize: 35, color: "#16c784" }} />
      ) : (
        <ArrowDropDownIcon sx={{ fontSize: 35, color: "#ea3936" }} />
      )}
      <Typography
        sx={{
          fontSize: 18,
          color: price > 0 ? "#16c784" : "#ea3936",
          fontWeight: "bold",
        }}
      >
        {price.toFixed(3)} %
      </Typography>
    </Box>
  </Box>
);
const ValueToFixed = ({ value }) => (
  <Typography
    sx={{
      fontSize: 18,
    }}
  >
    $ {Number(value.toFixed(2)).toLocaleString()}
  </Typography>
);
const ValueToFixedCircule = ({ value, symbol }) => (
  <Typography
    sx={{
      fontSize: 18,
    }}
  >
    {symbol.toUpperCase()} {Number(value.toFixed(2)).toLocaleString()}
  </Typography>
);

const Volume_Info = ({ volume, amount, symbol }) => (
  <Box>
    <Typography
      sx={{
        fontSize: 18,
      }}
    >
      $ {Number(volume.toFixed(2)).toLocaleString()}
    </Typography>
    <Typography
      sx={{
        fontSize: 14,
        color: "#cfcab4",
        fontWeight: "bold",
      }}
      width="100%"
    >
      {Number(amount.toFixed(2)).toLocaleString()} {symbol.toUpperCase()}
    </Typography>
  </Box>
);

export { Name, PriceChange, ValueToFixed, Volume_Info, ValueToFixedCircule };
