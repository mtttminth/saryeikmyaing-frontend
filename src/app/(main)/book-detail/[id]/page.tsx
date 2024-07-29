"use client";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Button,
  TextField,
  Rating,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import { Icon } from "@iconify/react";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NumberInput from "@/templates/ButtonInput";
import Link from "next/link";
import "@/styles/main.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchBookDetail, fetchRelatedBook } from "@/store/thunks/bookThunk";
type pageParam = {
  id: string;
};

const BookDetailScreen = ({ params }: { params: pageParam }) => {
  const [nav1, setNav1] = useState<any | null>(null);
  const [nav2, setNav2] = useState<any | null>(null);
  const [value, setValue] = useState<number | null>(2);
  const { loading, bookDetail, relatedBook } = useSelector(
    (state: RootState) => state.book
  );
  const dispatch = useDispatch<AppDispatch>();
  const id = parseInt(params.id);

  useEffect(() => {
    dispatch(fetchBookDetail(id));
    dispatch(fetchRelatedBook(id));
  }, []);
  const hasMultipleImages = bookDetail?.images?.length > 1;
  return (
    <Box sx={{ width: "100%", px: 8, py: 3 }}>
      <Box className="content-center items-center mb-8">
        <Typography className="text-slate-800 pb-4">
          {bookDetail.name}
        </Typography>
        <Divider
          sx={{ width: "3rem", borderWidth: "2.5px", borderColor: "#00AFEF" }}
        />
      </Box>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Slider
            className="slider"
            asNavFor={hasMultipleImages ? nav2 : null}
            ref={(slider) => setNav1(slider)}
            infinite={hasMultipleImages}
            slidesToShow={1}
            swipeToSlide={true}
            arrows={hasMultipleImages}
          >
            {bookDetail?.images?.map((image, index) => (
              <div key={index} className="my-image-container">
                <img src={image} className="h-auto md:w-5/12 sm:max-w-full" />
              </div>
            ))}
          </Slider>
          <Slider
            asNavFor={hasMultipleImages ? nav1 : null}
            ref={(slider) => setNav2(slider)}
            slidesToShow={5}
            swipeToSlide={true}
            focusOnSelect={true}
            arrows={false}
            infinite={false}
          >
            {bookDetail?.images?.map((image, index) => (
              <div key={index} className="p-2">
                <img src={image} className="h-auto max-w-full" />
              </div>
            ))}
          </Slider>
        </Grid>
        <Grid item xs={12} md={8}>
          <div className="md:pl-12 sm:pl-0">
            {bookDetail?.authors &&
              bookDetail?.authors?.map((author) => (
                <div className="bg-gray-300 mb-4">
                  <p className="px-4 py-2 text-black">
                    စာရေးဆရာ
                    <span className="text-sky-800">- {author.name}</span>
                  </p>
                </div>
              ))}

            <div className="bg-gray-300 mb-4">
              <p className="px-4 py-2 text-black">
                စာမျက်နှာ{" "}
                <span className="text-sky-800">- {bookDetail.page}</span>
              </p>
            </div>
            <div className="bg-gray-300 mb-4">
              <p className="px-4 py-2 text-black">
                စာအုပ်အရွယ်အစား{" "}
                <span className="text-sky-800">- {bookDetail.size}</span>
              </p>
            </div>
            <div className="bg-gray-300 mb-4">
              {bookDetail.discounted_price != null ? (
                <p className="px-4 py-2 text-black">
                  စျေးနှုန်း -
                  <span className="px-4 text-xs text-red-500 pr-2 line-through">
                    {bookDetail.price} MMK
                  </span>
                  <span className="text-sky-800">
                    {bookDetail.discounted_price} MMK
                  </span>
                </p>
              ) : (
                <p className="px-4 py-2 text-black">
                  စျေးနှုန်း -{" "}
                  <span className="text-sky-800">{bookDetail.price} MMK</span>
                </p>
              )}
            </div>
            <div className="bg-gray-300 mb-4">
              <p className="px-4 py-2 text-black">
                ပုံနှိပ်မှတ်တမ်း -
                <span className="text-sky-800">
                  {bookDetail.publication_detail}
                </span>
              </p>
            </div>
            <div className="bg-gray-300 mb-4">
              <p className="px-4 py-2 text-black">
                စက္ကူအမျိုးအစား -{" "}
                <span className="text-sky-800"> {bookDetail.paper_type}</span>
              </p>
            </div>
            <div className="flex">
              <NumberInput
                aria-label="Quantity Input"
                min={1}
                max={bookDetail.stock}
              />
              <Button
                component="label"
                variant="contained"
                tabIndex={-1}
                sx={{
                  backgroundColor: "#373435",
                  color: "#FFFFFF",
                  width: "100%",
                  ml: 3,
                }}
              >
                ဝယ်ယူမည်
              </Button>
            </div>
            <div className="mb-4">
              <p className="text-xs text-sky-600 mt-2">
                {bookDetail.stock} အုပ်ကျန်ရှိပါသည််
              </p>
            </div>
            <div className="flex">
              {bookDetail?.tags &&
                bookDetail?.tags?.map((tag) => (
                  <div className="bg-gray-300 mb-4 mr-2">
                    <p className="px-4 py-1 text-xs text-black">#{tag.name}</p>
                  </div>
                ))}
            </div>
          </div>
        </Grid>
      </Grid>
      <div className="mt-4">
        <p className="text-sm text-gray-700 leading-9">
          {bookDetail.description}
        </p>
        <h6 className="text-sm text-sky-800 mt-8 mb-8">
          လူကြီးမင်း၏ ဝေဖန်သုံးသပ်ချက်ကို မျှဝေပေးပါ...
        </h6>
        <TextField
          label="ဝေဖန်သုံးသပ်လိုသောစာကို ရေးပါ *"
          color="secondary"
          focused
          fullWidth
          multiline
          rows={4}
        />
        <div className="flex mt-4 justify-between">
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          <Button
            size="small"
            component="label"
            variant="contained"
            tabIndex={-1}
            sx={{
              backgroundColor: "#373435",
              color: "#FFFFFF",
              width: "100%",
              ml: 3,
              maxWidth: "20%",
            }}
          >
            ပေးပို့မည်
          </Button>
        </div>
      </div>
      <div className="mt-8 border-b-2 border-gray-300">
        <div className="flex items-center mb-4">
          <p className="text-sm text-gray-800 mr-2">Hayman Moe | 20/04/2024</p>
          <Rating name="read-only" value={value} readOnly />
        </div>
        <p className="text-gray-800 text-xs mb-4">
          ဒီစာအုပ်က ထူးခြားတယ်။ အတွင်းစွဲ Introverts တွေဘက်က လူ့အဖွဲ့အစည်းကို
          စိန်ခေါ်ထားတဲ့ စာအုပ်
        </p>
      </div>
      <div className="mt-8 border-b-2 border-gray-300">
        <div className="flex items-center mb-4">
          <p className="text-sm text-gray-800 mr-2">Hayman Moe | 20/04/2024</p>
          <Rating name="read-only" value={value} readOnly />
        </div>
        <p className="text-gray-800 text-xs mb-4">
          ဒီစာအုပ်က ထူးခြားတယ်။ အတွင်းစွဲ Introverts တွေဘက်က လူ့အဖွဲ့အစည်းကို
          စိန်ခေါ်ထားတဲ့ စာအုပ်
        </p>
      </div>
      {relatedBook.length > 0 ? (
        <Box className="content-center items-center my-8">
          <Typography className="text-slate-800 pb-4">
            ဆက်စပ် စာအုပ်များ
          </Typography>
          <Divider
            sx={{ width: "3rem", borderWidth: "2.5px", borderColor: "#00AFEF" }}
          />
        </Box>
      ) : null}

      <Grid container>
        {relatedBook &&
          relatedBook.map((book) => (
            <Grid xs={12} sm={6} md={3} sx={{ marginBottom: 3 }}>
              <Link href={``}>
                <div className="grid place-items-center pb-2">
                  <img
                    src={book.image_url}
                    alt={book.name}
                    className="h-auto md:w-40 sm:max-w-full"
                  />
                </div>
                <p className="truncate text-slate-900 text-sm leading-7">
                  {book.name}
                </p>
                {book.discounted_price != null ? (
                  <p className="text-sm text-cyan-500 leading-10">
                    <span className="text-xs text-red-500 pr-2 line-through">
                      {book.price} MMK
                    </span>
                    {book.discounted_price} MMK
                  </p>
                ) : (
                  <p className="text-sm text-cyan-500 leading-10">
                    {book.price} MMK
                  </p>
                )}
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-10">
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<AddShoppingCartIcon />}
                      sx={{
                        backgroundColor: "#373435",
                        color: "#FFFFFF",
                        width: "100%",
                      }}
                    >
                      ဈေးခြင်းထဲထည့်မယ်
                    </Button>
                  </div>
                  <IconButton aria-label="fingerprint" color="secondary">
                    <FavoriteBorderIcon />
                  </IconButton>
                </div>
              </Link>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default BookDetailScreen;
