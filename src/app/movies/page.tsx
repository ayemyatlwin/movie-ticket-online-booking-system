"use client";
import data from "@/constants";
import { setSelectedMovie } from "@/redux/slices/TicketSlice";
import IMovies from "@/types/Movies";
import { Container, Stack } from "@mui/material";
import { Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

const MovieListPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCardClick = (movie: IMovies) => {
    dispatch(setSelectedMovie(movie));
    // router.push("./cinemas");
  };

  return (
    <Container>
      <Stack direction="row" justifyContent="center" flexWrap="wrap">
        {data.movie_lists.map((movie, index) => (
          <Stack
            key={index}
            width={300}
            m={2}
            sx={{
              border: "1px solid #5b92c8",
              borderRadius: "8px",
              overflow: "hidden",
              transition: "transform 0.2s",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              },
            }}
            onClick={() => handleCardClick(movie)}
          >
            <Image
              src={movie.MoviePhoto}
              alt={movie.MovieTitle}
              width={300}
              height={200}
              layout="responsive"
              objectFit="cover"
            />
            <Stack
              bgcolor={"#f5f5f5"}
              height={50}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography color={"#5b92c8"}>{movie.MovieTitle}</Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Container>
  );
};

export default MovieListPage;
