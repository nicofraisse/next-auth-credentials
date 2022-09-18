import Link from 'next/link'
import React, { useEffect } from 'react'
import {
  Award,
  Hash,
  Heart,
  Home,
  Info,
  List,
  Lock,
  Map,
  Search,
  User,
  Users,
  Watch,
  BarChart2,
  Eye,
} from 'react-feather'
import Image from 'next/image'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { useCurrentUser } from 'lib/useCurrentUser'
import { useLoginForm } from '../context/LoginFormProvider'
import ConditionalWrapper from 'components/ConditionalWrapper'

const Item = ({ label, href, icon, disabled, onClick, requireLogin }) => {
  const { pathname } = useRouter()
  const isActive = pathname?.split('/')[1] === href.split('/')[1]
  const Icon = icon

  return (
    <ConditionalWrapper
      condition={!requireLogin}
      wrapper={(children) => (
        <Link href={href} passHref>
          {children}
        </Link>
      )}
    >
      <div
        onClick={() => onClick(requireLogin)}
        className={classNames(
          'flex items-center p-3 pl-4 text-base cursor-pointer select-none transition duration-100',
          {
            'bg-orange-100 font-bold text-orange-600': isActive,
            'hover:bg-orange-100': !disabled,
            'text-gray-300 hover:bg-white cursor-default pointer-events-none': disabled,
          }
        )}
      >
        <span className='mr-3'>
          <Icon size={22} />
        </span>
        {label}
      </div>
    </ConditionalWrapper>
  )
}

const Sidebar = ({ showMobileSidebar, toggleMobileSidebar }) => {
  const { currentUser } = useCurrentUser()
  const { openLogin } = useLoginForm()

  const onClickItem = (requireLogin) => {
    if (!currentUser && requireLogin) {
      openLogin()
    } else {
      toggleMobileSidebar()
    }
  }

  return (
    <>
      {showMobileSidebar && (
        <div
          className='bg-black fixed h-screen w-screen z-10 bg-opacity-40 block lg:hidden'
          onClick={toggleMobileSidebar}
        ></div>
      )}
      <div
        className={classNames('fixed lg:static lg:block lg:min-w-[228px]', {
          hidden: !showMobileSidebar,
          'block bg-white h-screen z-10': showMobileSidebar,
        })}
      >
        <nav
          className={classNames(
            'border-r lg:pt-2 h-screen lg:fixed lg:min-w-[228px] flex flex-col justify-between'
          )}
        >
          <div>
            <Link href='/top-poutines'>
              <a>
                <div className='flex items-center -ml-4 transform scale-75'>
                  <Image alt='poutine-logo' src='/poutine.png' width={1.506 * 80} height={80} />
                  <div className='text-2xl font-black mt-[-8px] ml-1'>
                    <div className='text-amber-600'>POUTINE</div>
                    {/* <div className='mt-[-10px] text-orange-300'>MANIA</div> */}
                    <div className='mt-[-10px] text-orange-600'>
                      MANIA<span className='text-gray-300'>.ca</span>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
            <Item onClick={onClickItem} label='Top 20 poutines' icon={Award} href='/top-poutines' />
            <Item
              onClick={onClickItem}
              label='Toutes les poutines'
              icon={Map}
              href='/restaurants'
            />
            {/* <Item onClick={onClickItem} label='Derniers avis' icon={Hash} href='/' /> */}
            {/* 
          <Item
            onClick={onClickItem}
            label='Mon top poutines'
            icon={Heart}
            href='mon-top'
            disabled
          /> */}

            <Item
              onClick={onClickItem}
              label={`Mes poutines (${currentUser?.nbReviews || 0})`}
              icon={BarChart2}
              href={`/users/${currentUser?._id}`}
              requireLogin={!currentUser}
            />

            {/* <Item
              onClick={onClickItem}
              label='À essayer (3)'
              icon={List}
              href='watchlist'
              requireLogin={!currentUser}
            /> */}
            {currentUser?.isAdmin && (
              <Item onClick={onClickItem} label='Admin' icon={Lock} href='/admin' />
            )}
          </div>
          <div className='mb-3'>
            <Item onClick={onClickItem} label='À Propos' icon={Info} href='/a-propos' />
          </div>
        </nav>
      </div>
    </>
  )
}

export default Sidebar
