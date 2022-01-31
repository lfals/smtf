import { useEffect, useState } from 'react'
import { Title, Clock, Icon, Wrapper, ClockWrapper, Button } from './style';
import { FaClock } from 'react-icons/fa'

const Worktime = (props: any) => {

const currentTime = props.timer/1000/60

const fullSeconds = Math.floor((props.timer / 1000) % 60)
const fullMinutes = Math.floor((props.timer / (1000 * 60)) % 60)

const minutes = (fullMinutes < 10) ? "0" + fullMinutes : fullMinutes
const seconds = (fullSeconds < 10) ? "0" + fullSeconds : fullSeconds

const time = `${minutes}:${seconds}`




  return (
    <>
    <Wrapper>
      <FaClock size={56} />
      <ClockWrapper>
      <Title>{props.title}</Title>
      <Clock>{time}</Clock>
      </ClockWrapper>
      <Button onClick={props.action}>{props.actionName}</Button>
    </Wrapper>
    </>
  )
}

export default Worktime
