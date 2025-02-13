import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import json_data from 'src/api/sample'
import BarcodeComponent from 'src/@core/components/barcode'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { AddToWallet } from 'src/assets/add_to_google_wallet'
import { GOOGLE_PLAY_BASE_URL } from 'src/@core/utils/constants'

dayjs.extend(utc)

const WalletPage = () => {
  const [data] = useState(json_data)
  const [tickets, setTickets] = useState(data.tickets)
  const [new_ticket, setNewTicket] = useState('')

  const [current_page, setCurrentPage] = useState(1)
  const [ticket, setCurrentTicket] = useState(tickets[0])
  const [open_modal, setOpenModal] = useState(false)
  const currentYear = dayjs().year()

  const goToPage = page => {
    const index = page - 1
    if (index <= tickets.length || index >= 0) {
      setCurrentTicket(tickets[index])
      setCurrentPage(page)
    }
  }

  const doSaveNewTicket = () => {
    try {
      const newTicketParsed = JSON.parse(new_ticket)

      const keys_arr = [
        'EventName',
        'Venue',
        'EventDate',
        'EventTime',
        'basicBarcode',
        'exitPortal',
        'seat',
        'row',
        'section',
        'background_color',
        'header_color',
        'barcode',
        'jwt'
      ]

      const allKeysPresent =
        Object.keys(newTicketParsed).filter(key => keys_arr.includes(key)).length === keys_arr.length

      if (allKeysPresent) {
        setTickets([newTicketParsed, ...tickets])
        setCurrentTicket(newTicketParsed)
        setNewTicket('')
        setCurrentPage(1)
        setOpenModal(false)
      } else {
        alert('Not all keys are present in the new ticket.')
      }
    } catch (error) {
      alert('Invalid data')
    }
  }

  return (
    <div className='h-screen w-full'>
      <Modal
        onCancel={() => setOpenModal(false)}
        open={open_modal}
        closeIcon={false}
        footer={[
          <button
            key={Math.random()}
            style={{
              color: ticket.background_color,
              backgroundColor: ticket.header_color,
              border: '1px solid',
              borderColor: ticket.background_color
            }}
            className='rounded-md px-2 py-1 text-white'
            onClick={() => setOpenModal(false)}
          >
            Close
          </button>,
          <button
            key={Math.random()}
            style={{
              backgroundColor: ticket.background_color,
              border: '1px solid',
              borderColor: ticket.background_color
            }}
            className='rounded-md px-2 py-1 text-white ml-4'
            onClick={doSaveNewTicket}
          >
            Save
          </button>
        ]}
      >
        <textarea
          rows={13}
          type='text'
          style={{ border: '1px solid', borderColor: ticket.background_color }}
          className={`border w-full h-full rounded-md p-3 outline-none ${' ' ? 'border-red-500' : ''}`}
          placeholder='Enter your json here'
          value={new_ticket}
          onChange={e => setNewTicket(e.target.value)}
        />
      </Modal>
      <div className='w-full h-fit'>
        <div
          className='w-full h-[90px] flex flex-row align-middle justify-between pl-10'
          style={{ backgroundColor: `${ticket.background_color}`, color: `${ticket.header_color}` }}
        >
          <div className='flex flex-col justify-center'>
            <span className='font-[400] max-md:text-[16px]'>{ticket.EventName}</span>
            <div className='flex flex-row space-x-1 text-[16px] max-md:text-[12px]'>
              <span>
                {`${
                  ticket.event_date
                    ? dayjs.utc(ticket.event_date).format('ddd . MMM D, YYYY . hh:mm A -')
                    : `${dayjs(`${ticket.EventDate} ${currentYear}`, 'DD MMM YYYY').format('ddd')} .	${
                        ticket.EventDate
                      }, ${currentYear} . ${ticket.EventTime.toUpperCase()} -`
                }`}
              </span>
              <span>{ticket.Venue}</span>
            </div>
          </div>
          <div className='flex justify-center items-center h-full mr-8 max-md:mr-3'>
            <Button
              className='border rounded-md h-fit px-2.5 font-[600]'
              style={{ backgroundColor: ticket.header_color, color: ticket.background_color }}
              type='primary'
              onClick={() => setOpenModal(true)}
            >
              +
            </Button>
          </div>
        </div>
        <div className='w-[86%] h-fit mt-16 flex flex-col mx-auto rounded-xl shadow-md border max-w-[1140px]'>
          <div
            style={{ backgroundColor: `${ticket.background_color}`, color: `${ticket.header_color}` }}
            className='w-full h-20 rounded-t-xl flex flex-row justify-around items-center'
          >
            <div className='ticket-header-col'>
              <p className='ticket-header-key'>Section</p>
              <span className='ticket-header-value'>{ticket.section}</span>
            </div>
            <div className='ticket-header-col'>
              <p className='ticket-header-key'>Row</p>
              <span className='ticket-header-value'>{ticket.row}</span>
            </div>
            <div className='ticket-header-col'>
              <p className='ticket-header-key'>Seat</p>
              <span className='ticket-header-value'>{ticket.seat}</span>
            </div>
          </div>
          <div className='w-full flex flex-col items-center justify-center space-y-3'>
            <div className='h-[60px] w-[275px] flex mt-20 relative justify-center items-center'>
              <BarcodeComponent barcodeData={ticket.barcode} />
              <div className='obfuscator1' />
              <div className='obfuscator2' />
            </div>
            <span>{ticket.basicBarcode.slice(0, ticket.basicBarcode.length - 1)}</span>
            <span className='text-sm font-[300] pb-4'>Screenshots won't get you in.</span>
            <a
              className='pb-24'
              href={ticket.jwt.includes(GOOGLE_PLAY_BASE_URL) ? ticket.jwt : `${GOOGLE_PLAY_BASE_URL}${ticket.jwt}`}
              target='_blank'
              rel='noreferrer'
            >
              <AddToWallet className='max-md:px-6' />
            </a>
          </div>
        </div>
      </div>
      <div className='flex space-x-4 mt-2 flex-row items-center justify-center'>
        <button
          disabled={current_page === 1}
          onClick={() => goToPage(current_page - 1)}
          className='text-black text-[20px] font-[600]'
        >
          {'<'}
        </button>
        <span>
          {current_page} of {tickets.length}
        </span>
        <button
          disabled={current_page === tickets.length}
          onClick={() => goToPage(current_page + 1)}
          className='text-black text-[20px] font-[600]'
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}

export default WalletPage
