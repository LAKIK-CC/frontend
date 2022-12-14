import React, { useEffect, useState } from "react";
import TextInput from "../../components/textInput/TextInput.js";
import TextAreaInput from "../../components/textAreaInput/TextAreaInput.js";
import PasswordInput from "../../components/passwordInput/PasswordInput.js";
import {
  Button,
  Text,
  Spinner,
  Box,
  Flex,
  Grid,
  GridItem,
  Spacer,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ROUTE from "../../config/api/Route.js";
import BASE_URL from "../../config/api/Constant.js";
import axios from "axios";

function Register() {
  const [errl, setErrl] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValue: {
      deskripsiKos: "",
    },
  });

  const onNext = async () => {
    const result = await trigger();
    if (result) {
      setSelectedTab(1);
    }
  };

  const onSubmit = (data) => {
    setIsLoading(true);

    if (data.password !== data.password2) {
      setErrl("Pastikan konfirmasi password sama");
      setIsLoading(false);
      return "";
    }

    data["role"] = "PEMILIK_KOS";
    axios
      .post(`${BASE_URL}/v1/user/register`, data)
      .then((response) => {
        if (response.data.message.includes("could not execute statement; SQL")) {
          setErrl("Username telah dimiliki, silakan ubah username yang baru");
          setIsLoading(false);
          return "";
        }
        navigate(ROUTE.LOGIN + "?isRegistered=true");
        setIsLoading(false);
      })
      .catch((error) => {
        setErrl(error.response.data.message);
        setIsLoading(false);
      });

    return data;
  };

  return (
    <Flex
      minH="100vh"
      backgroundRepeat="no-repeat"
      justify="center"
      align="center"
    >
      <Grid
        w="full"
        h="full"
        px="49px"
        templateColumns="repeat(10, 1fr)"
        gap={40}
      >
        <GridItem colSpan={5}>
          <Text fontSize="64px" fontWeight="semibold" color="black">
            Layanan Ketersedian dan Informasi Kos
          </Text>
        </GridItem>
        <GridItem colSpan={4} alignSelf="center">
          <Box verticalAlign="center">
            <Text mb={23} fontSize="32px" fontWeight="semibold" color="black">
              Daftar
            </Text>
            <Box as="form" onSubmit={handleSubmit(onSubmit)}>
              <Box>
                <Grid
                  justify="start"
                  w="50vw"
                  h="full"
                  templateColumns="repeat(4, 1fr)"
                  gap="20px"
                >
                  <GridItem colSpan={1}>
                    <Text
                      onClick={() => setSelectedTab(0)}
                      textAlign="center"
                      color={selectedTab == 0 ? "#FF884B" : "black"}
                      fontWeight={selectedTab == 0 ? "700" : "500"}
                      cursor="pointer"
                    >
                      Data Kos
                    </Text>
                  </GridItem>

                  <GridItem colSpan={1}>
                    <Text
                      onClick={() => setSelectedTab(1)}
                      textAlign="center"
                      color={selectedTab == 1 ? "#FF884B" : "black"}
                      fontWeight={selectedTab == 1 ? "700" : "500"}
                      cursor="pointer"
                    >
                      Akun
                    </Text>
                  </GridItem>
                </Grid>
              </Box>
              <Box mb="20px" />

              {selectedTab == 1 && (
                <Box>
                  <TextInput
                    id="email"
                    title="Email"
                    placeholder="name@example.com"
                    errors={errors}
                    register={register}
                    rules={{
                      required: "Wajib diisi",
                      minLength: { value: 1, message: "Wajib diisi" },
                      maxLength: { value: 50, message: "Maksimal 50 karakter" },
                      pattern: { value: /.[@].*[\.]./, message: "Pastikan format email benar" },
                      validate: (text) => {
                        if (text.indexOf(' ') >= 0) {
                          return "Pastikan tidak ada spasi pada email"
                      }},
                    }}
                  />
                  <Box mb="20px" />

                  <TextInput
                    id="username"
                    title="Username"
                    placeholder="myusername"
                    errors={errors}
                    register={register}
                    rules={{
                      required: "Wajib diisi",
                      minLength: { value: 1, message: "Wajib diisi" },
                      maxLength: { value: 50, message: "Maksimal 50 karakter" },
                    }}
                  />
                  <Box mb="20px" />

                  <PasswordInput
                    id="password"
                    title="Password"
                    placeholder="mypassword123"
                    errors={errors}
                    register={register}
                    rules={{
                      required: "Wajib diisi",
                      minLength: { value: 8, message: "Minimal 8 karakter" },
                    }}
                  />
                  <Box mb="20px" />

                  <PasswordInput
                    id="password2"
                    title="Konfirmasi Password"
                    placeholder="mypassword123"
                    errors={errors}
                    register={register}
                    rules={{
                      required: "Wajib diisi",
                      minLength: { value: 8, message: "Minimal 8 karakter" },
                    }}
                  />
                  <Box mb="20px" />

                  <Flex minWidth="max-content" alignItems="center" gap="2">
                    <Button
                      onClick={() => setSelectedTab(0)}
                      colorScheme="orangeChill"
                      width="8em"
                      borderRadius={10}
                    >
                      Kembali
                    </Button>
                    <Spacer />
                    <Button
                      id="signInButton"
                      colorScheme="orangeChill"
                      type="submit"
                      width="8em"
                      borderRadius={10}
                    >
                      {isLoading ? <Spinner /> : "Daftar"}
                    </Button>
                  </Flex>
                </Box>
              )}

              {selectedTab == 0 && (
                <Box>
                  <TextInput
                    id="namaKos"
                    title="Nama Kos"
                    placeholder="Masukkan nama kos"
                    errors={errors}
                    register={register}
                    rules={{
                      required: "Wajib diisi",
                      minLength: { value: 1, message: "Wajib diisi" },
                      maxLength: { value: 50, message: "Maksimal 50 karakter" },
                    }}
                  />
                  <Box mb="20px" />

                  <TextInput
                    id="nomorTeleponKos"
                    title="Nomor Telepon Kos"
                    placeholder="Masukkan no telepon yang dapat dihubungi"
                    errors={errors}
                    register={register}
                    rules={{
                      required: "Wajib diisi",
                      minLength: { value: 1, message: "Wajib diisi" },
                      maxLength: { value: 20, message: "Maksimal 20 angka" },
                      pattern: { value: /^[0-9]+$/, message: "Pastikan hanya diisi angka" }
                    }}
                  />
                  <Box mb="20px" />

                  <TextAreaInput
                    id="alamatKos"
                    title="Alamat Kos"
                    placeholder="Masukkan alamat kos"
                    errors={errors}
                    register={register}
                    rules={{
                      required: "Wajib diisi",
                      minLength: { value: 1, message: "Wajib diisi" },
                    }}
                  />
                  <Box mb="20px" />

                  <TextAreaInput
                    id="deskripsiKos"
                    title="Deskripsi Kos"
                    placeholder="Masukkan deskripsi kos"
                    errors={errors}
                    register={register}
                  />
                  <Box mb="20px" />

                  <Button
                    onClick={onNext}
                    colorScheme="orangeChill"
                    width="8em"
                    borderRadius={10}
                  >
                    Lanjut
                  </Button>
                </Box>
              )}

              <Box mb="20px" />
              {errl && (
                <div>
                  <Text color="red">{errl}</Text>
                </div>
              )}
              <Box mb="20px" />
            </Box>

            <Box mb="20px" />
            <Text as="span">Apakah telah mempunyai akun? </Text>
            <Text as="u" fontWeight="600">
              <Text
                as="span"
                cursor="pointer"
                onClick={() => navigate(ROUTE.LOGIN)}
                color="#FF884B"
              >
                Masuk
              </Text>
            </Text>
          </Box>
        </GridItem>
      </Grid>
    </Flex>
  );
}

export default Register;
