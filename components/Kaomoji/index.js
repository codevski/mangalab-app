import React, { useState, useEffect } from "react";
import { Text } from "react-native";

const kaomojiMessages = [
  "(ノ_<。)",
  "(μ_μ)",
  "o(TヘTo)",
  "( ﾟ，_ゝ｀)",
  "( ╥ω╥ )",
  "(／ˍ・、)",
  "(つω`｡)",
  "(T_T)",
  "o(〒﹏〒)o",
  "(-_-)",
  "(ﾉД`)",
  "( ; ω ; )",
  "(个_个)",
  "(╯_╰)",
  "(ノ_<、)",
  "(｡T ω T｡)",
  "(>_<)",
  "(｡•́︿•̀｡)",
  "(´-ω-`)",
  "(-ω-、)",
  "(｡╯︵╰｡)",
  "(╯︵╰,)",
  "(╥_╥)",
  "(╥﹏╥)",
  "(ﾉω･､)",
  "(っ˘̩╭╮˘̩)っ",
  "(ಥ﹏ಥ)",
  ".･ﾟﾟ･(／ω＼)･ﾟﾟ･.",
  "。゜゜(´Ｏ`) ゜゜。",
  "｡･ﾟﾟ*(>д<)*ﾟﾟ･｡",
  "｡･ﾟ(ﾟ><ﾟ)ﾟ･｡",
  ".｡･ﾟﾟ･(＞_＜)･ﾟﾟ･｡.",
  "｡ﾟ(｡ﾉωヽ｡)ﾟ｡",
  "･ﾟ･(｡>ω<｡)･ﾟ･",
  "｡ﾟ･ (>﹏<) ･ﾟ｡",
];

const getMessage = () => {
  return kaomojiMessages[Math.floor(Math.random() * kaomojiMessages.length)];
};

const Kaomoji = () => {
  const [moji, setMoji] = useState();

  useEffect(() => {
    if (!moji) setMoji(getMessage());
  }, [moji]);

  return <Text>{moji}</Text>;
};

export default Kaomoji;
