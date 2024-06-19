"use client";
import { setSelectedMovie } from "@/redux/slices/TicketSlice";
import IMovies from "@/types/Movies";
import {
  Container,
  FormControl,
  FormLabel,
  OutlinedInput,
  Pagination,
  Stack,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./MovieListPage.module.css";
import { getList } from "@/API";
import useSWR from "swr";

const fetchMovieList = async () => {
  const response = await getList();
  return response.data.Tbl_MovieList;
};

const MovieListPage = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch();
  const { data: movieList } = useSWR<IMovies[]>("movieList", fetchMovieList);
  const handleCardClick = (movie: IMovies) => {
    dispatch(setSelectedMovie(movie));
    router.push("./cinemas");
  };
  const [searchedText, setSearchedText] = useState<string>("");
  const deferredSearchText = useDeferredValue(searchedText);
  const [movieCardList, setMovieCardList] = useState<IMovies[]>([]);
  useEffect(() => {
    if (movieList) {
      let searchedResult = movieList;
      if (deferredSearchText?.trim()) {
        searchedResult = searchedResult.filter((v) =>
          v.MovieTitle?.toLowerCase().includes(
            deferredSearchText.trim().toLowerCase()
          )
        );
      }

      setMovieCardList(searchedResult);
    }
  }, [deferredSearchText, movieList]);

  const paginate = ({
    data,
    page_size = 5,
    page_number,
  }: {
    data: any[];
    page_size?: number;
    page_number: number;
  }) => {
    return data.slice((page_number - 1) * page_size, page_number * page_size);
  };
  const renderList = useMemo(() => {
    if (movieCardList.length > 0) {
      const paginatedData = paginate({
        data: movieCardList,
        page_number: page,
      });
      return (
        <>
          {paginatedData?.map((movie: IMovies, index: number) => (
            <Stack
              key={index}
              className={styles.movieCard}
              onClick={() => handleCardClick(movie)}
            >
              <Image
                src={`/images/${movie.MoviePhoto}`}
                alt={movie.MovieTitle}
                width={300}
                height={250}
              />
              <Stack className={styles.movieTitle}>
                <Typography color={"#5b92c8"}>{movie.MovieTitle}</Typography>
              </Stack>
            </Stack>
          ))}
        </>
      );
    }
  }, [movieCardList, page]);
  return (
    <Container>
      <Stack direction={"row"} mb={1} justifyContent={"flex-end"}>
        <FormControl>
          <FormLabel>Search by movie name</FormLabel>
          <OutlinedInput
            sx={{ width: 300 }}
            size="small"
            type="search"
            onChange={(e) => {
              setSearchedText(e.target.value);
              setPage(1);
            }}
          />
        </FormControl>
      </Stack>
      <Stack direction="row" justifyContent="center" flexWrap="wrap">
        {renderList}
      </Stack>
      <Stack direction={"row"} justifyContent={"center"}>
        {movieCardList?.length > 0 ? (
          <Pagination
            count={movieCardList.length / 5}
            page={page}
            shape="rounded"
            variant="outlined"
            sx={{ mt: 1 }}
            onChange={(e, _page) => setPage(_page)}
          />
        ) : null}
      </Stack>
    </Container>
  );
};

export default MovieListPage;
