import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {actionGetQuotes} from "../redux/action/actionQuotes";
import {reducerChangeAmount, selectQuotes} from "../redux/reducer/reducerQuotes";

import {ReactComponent as Arrow} from '../assets/img/icons/arrow.svg'
import {ReactComponent as Coin} from '../assets/img/icons/coin.svg'
import {ReactComponent as Clock} from '../assets/img/icons/clock.svg'
import './Main.scss';

const Main = () => {
  const dispatch = useDispatch()
  const {quotes} = useSelector(selectQuotes)
  const {source_amount, target_amount, fiat_blockchain_fee, absolute_internal_fee} = quotes
  const [editSource, setEditSource] = useState(false)
  const [editTarget, setEditTarget] = useState(false)
  const [timeout, setTimeoutState] = useState(0)

  const sourceRef = useRef(null)
  const targetRef = useRef(null)

  useEffect(() => {
    dispatch(actionGetQuotes({"source_amount": "1100.0"}))
  }, [dispatch])

  useEffect(() => {
    const handleClickOutside = () => {
      if (sourceRef.current) {
        setEditSource(false)
      }
      if (targetRef.current) {
        setEditTarget(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dispatch])

  const handleChange = (amount) => {
    dispatch(reducerChangeAmount(amount))
    if (timeout) clearTimeout(timeout);
    setTimeoutState(
      setTimeout(() => {
        dispatch(actionGetQuotes(amount))
      }, 300)
    )
  }

  const handleClickSource = () => {
    setEditSource(true)
  }

  const handleClickTarget = () => {
    setEditTarget(true)
  }

  return (
    <div className='Main'>
      <img className="pixelperfect" src={require("../assets/img/images/1.png")} alt=""/>
      <div className="card">
        <h2 className="card__title">Select Your Amount</h2>
        <div className="block">
          <div className="block__left">
            <span>You Pay</span>
            {editSource ?
              <input
                type="text"
                value={source_amount}
                ref={sourceRef}
                onChange={(e) => handleChange({"source_amount": e.target.value})}
                autoFocus
              />
              :
              <span onClick={handleClickSource}>{source_amount}</span>
            }
          </div>
          <div className="block__right">
            <span>USD</span>
            <img src={require("../assets/img/images/flag.png")} alt=""/>
            <Arrow/>
          </div>
          <div className="fee_line">
            <div className="fee_line__label">
              <span className='fee_line__label-cyrcle'/>
              <span className='fee_line__label-text'>Fees</span>
            </div>
          </div>
        </div>
        <div className="fee">
          <div className="fee_block">
            <span>Network Fee</span>
            <span>{fiat_blockchain_fee}$</span>
          </div>
          <div className="fee_symbol">+</div>
          <div className="fee_block">
            <span>C14 Fee</span>
            <span>{absolute_internal_fee}$</span>
          </div>
          <div className="fee_symbol">=</div>
          <div className="fee_block">
            <span>Total Fee</span>
            <span>{(+fiat_blockchain_fee + +absolute_internal_fee).toFixed(2)}$</span>
          </div>
        </div>
        <div className="block">
          <div className="block__left">
            <span>You Receive</span>
            {editTarget ?
              <input
                type="text"
                value={target_amount}
                ref={targetRef}
                onChange={(e) => handleChange({"target_amount": e.target.value})}
                autoFocus
              />
              :
              <span onClick={handleClickTarget}>{target_amount}</span>
            }
          </div>
          <div className="block__right">
            <span>USDC EVMOS</span>
            <div className="coin">
              <Coin/>
            </div>
            <Arrow/>
          </div>
        </div>
        <div className="data">
          <div className="data_block">
            <img src={require("../assets/img/images/destination.png")} alt=""/>
            <div className="data_block__info">
              <span>Destination Address</span>
              <span>msWZQGyzYiCL3VPw1ajHkXcF9nRo9V2vsc</span>
            </div>
          </div>
          <div className="data_block">
            <Clock/>
            <div className="data_block__info">
              <span>Average Processing Time</span>
              <span>4 Minutes</span>
            </div>
          </div>
        </div>
        <button className="btn_buy">Buy Now</button>
      </div>
    </div>
  );
}

export default Main;
