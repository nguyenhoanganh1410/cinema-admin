import React, { useEffect, useState } from "react";
import {
  Input,
  Col,
  Row,
  Typography,
  message,
  Avatar,
  Breadcrumb,
  Upload,
  Button,
  Form,
  Modal
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
  MESSAGE_REQUIRE_NAME,
  MESSAGE_WITHOUT_SPECIAL,
  NOT_EMPTY,
} from "../../utils/constants";
import { removeAscent } from "../../utils/FormatString";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import TokenService from "../../service/token.service";
import { getStaffById, updateStaff } from "../../services/StaffFetch";
import { notifyError, notifySucess } from "../../utils/Notifi";
import tokenService from "../../service/token.service";
import { useNavigate } from "react-router-dom";
import { setCinema, setUser } from "../../redux/actions";

let schema = yup.object().shape({
  first_name: yup.string().trim().required(NOT_EMPTY),
  last_name: yup.string().trim().required(NOT_EMPTY),
});

export const yupSync = {
  async validator({ field }, value) {
    if (field === "namePromotion") {
      value = removeAscent(value);
    }
    await schema.validateSyncAt(field, { [field]: value });
  },
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => {
      console.log(error);
      reject(error);
    }
  });

const useUserHook = (showModalAddCustomer, setShowModalAddCustomer) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [userCurrent, setUserCurrent] = useState(null);
  const [file, setFile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const depatch = useDispatch();
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    console.log(file.url);
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(newFileList);
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const handleUpdateProfile = async (val) => {
    const data = new FormData();
    data.append("firstName", val.first_name);
    data.append("lastName", val.last_name);
    data.append("phone", userCurrent?.phone);
    data.append("email", userCurrent?.email);
    if (fileList[0] && fileList[0]?.uid != -1) {
      data.append("image", fileList[0].originFileObj);
    } else if( fileList.length === 0){
      data.append("image", "");
    }
    try {
      setLoadingProfile(true)
      const result = await updateStaff(userCurrent?.id, data);
      const staff = await getStaffById(userCurrent?.id);
      const newStaff = {
        staff
      }
      console.log(newStaff)
        //luu thông tin acessTonken vào localstorage
      tokenService.setUser(newStaff);
      depatch(setUser(staff));
      setUserCurrent(newStaff);
      notifySucess("Cập nhật thành công.");
    } catch (error) {
      console.log(error);
      notifyError(error?.response?.data?.message);
    } finally{
      setLoadingProfile(false)
    }
    
  };

  useEffect(() => {
    //get info user in local storage
    setUserCurrent(TokenService.getUser().staff);
  }, []);

  return {
    form,
    uploadButton,
    user: userCurrent,
    imageUrl,
    loading,
    handleChange,
    getBase64,
    handleUpdateProfile,
    loadingProfile,
    setImageUrl,
    previewImage,
    previewOpen,
    previewTitle,
    fileList,
    handleCancel,
    handlePreview,
    setFileList
  };
};

export default useUserHook;
