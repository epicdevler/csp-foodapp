'use client'
import { Box, Heading, IconButton } from "@chakra-ui/react";
import { useParams } from "next/navigation";

export default function Orders() {

  const params = useParams()

  const orderId = params.id


  return (
    <Box p={5}>
      <Heading size={'lg'}>Customer Detail {orderId}</Heading>


    </Box>
  )
}
