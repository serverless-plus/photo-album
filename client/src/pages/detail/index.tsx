import React, { useState } from "react";
import { View, Text, Image, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import {
  AtMessage,
  AtTag,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction
} from "taro-ui";
import { useMount } from "react-use";

import BackButton from "../../components/back-button";
import BaseButton from "../../components/button";
import LabelList from "../../components/label-list";
import { Image as ImageInterface } from "../../typings";

import "./index.less";

import { getImage, deleteImage } from "../../apis";

export default function Detail() {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(0);
  const [detail, setDetail] = useState({} as ImageInterface);
  const [deleting, setDeleting] = useState(false);
  const [showModel, setShowModel] = useState(false);

  async function getImageDetail(id) {
    const { data } = await getImage(id);
    if (data) {
      setDetail(data);
    } else {
      Taro.atMessage({
        type: "error",
        message: "图片不存在"
      });
      Taro.navigateBack();
    }
  }

  async function onDelete() {
    setShowModel(false);

    setDeleting(true);
    try {
      await deleteImage(detail.id);
      Taro.atMessage({
        type: "success",
        message: "删除成功"
      });
      Taro.navigateBack();
    } catch (e) {
      Taro.atMessage({
        type: "error",
        message: e.message
      });
    }
    setDeleting(false);
  }

  useMount(async () => {
    const router = Taro.getCurrentInstance().router;
    const { params } = router;
    const id = +params.id;
    setId(id);

    getImageDetail(id);
  });

  const labels = (detail.labels || "").split(";").filter(item => item);

  return (
    <View className="detail-page">
      <AtMessage />

      <View className="label-box">
        <Text className="label-title primary-color">标签：</Text>
        <LabelList list={labels}/>
      </View>

      <Image src={detail.url} className="detail-image" />

      <BaseButton
        onClick={() => {
          setShowModel(true);
        }}
        icon="trash"
        loading={deleting}
        className="delete-button"
      />
      <BackButton />
      <AtModal isOpened={showModel}>
        <AtModalHeader>提示</AtModalHeader>
        <AtModalContent>确认删除当前图片，删除后将不可恢复？</AtModalContent>
        <AtModalAction>
          {" "}
          <Button
            onClick={() => {
              setShowModel(false);
            }}
          >
            取消
          </Button>{" "}
          <Button onClick={onDelete}>确定</Button>{" "}
        </AtModalAction>
      </AtModal>
    </View>
  );
}
