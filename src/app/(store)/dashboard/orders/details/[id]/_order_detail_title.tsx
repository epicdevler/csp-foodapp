'use client'
import {Heading} from '@chakra-ui/react'
import { useParams } from "next/navigation";

export default function OrderDetailTitle() {

    
  const params = useParams()

  const orderId = params.id

  return (
    <Heading size={'lg'}>Order Detail {orderId}</Heading>
  )
}
