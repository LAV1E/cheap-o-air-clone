import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Plane,
  Package,
  BedDouble,
  CarFront,
  Sparkles,
  ChevronDown,
  ArrowLeftRight,
  CalendarDays,
  MessageSquare,
  Globe2,
  UserRound,
  Plus,
  Minus,
  ArrowUpRight,
  Info,
  ShieldCheck,
  Headphones,
  Award,
} from 'lucide-react';

import './index.css';
import fallEscape from './assets/fall-escape.jpg';
import clubMiles from './assets/clubmiles-bg.jpg';

const navy = '#06275f';
const blue = '#0646c5';

function Logo() {
  return (
    <div className="flex items-center">
      <div className="text-[34px] font-extrabold tracking-[-2px] leading-none">
        <span className="text-[#1460aa]">cheap</span>
        <span className="text-[#1460aa]">o</span>
        <span className="text-[#f4511e]">air</span>
        <sup className="ml-1 text-[9px] text-[#1460aa]">®</sup>
      </div>
    </div>
  );
}

function Dropdown({ open, children, className = '' }) {
  if (!open) return null;

  return (
    <div
      className={`absolute z-[100] rounded-[12px] bg-white shadow-[0_8px_26px_rgba(0,0,0,.22)] ${className}`}
    >
      {children}
    </div>
  );
}

function Radio({ active }) {
  return <span className={`circle-radio ${active ? 'active' : ''}`} />;
}

function Check() {
  return <span className="check" />;
}

const tripOptions = ['Round-trip', 'One-way', 'Multi-city'];
const cabinOptions = ['Coach', 'Premium Economy', 'Business', 'First'];

function TravelerMenu({
  adults,
  setAdults,
  senior,
  setSenior,
  child,
  setChild,
  seat,
  setSeat,
  lap,
  setLap,
  onDone,
}) {
  const rows = [
    ['Adult', 'Aged 12-64', adults, setAdults, true],
    ['Senior', 'Aged 65+', senior, setSenior, false],
    ['Child', 'Aged 2-11', child, setChild, false],
    ['Seat Infant', 'Under 2', seat, setSeat, false],
    ['Lap Infant', 'Under 2', lap, setLap, false],
  ];

  return (
    <div className="w-[408px] p-7 pt-8">
      {rows.map(([label, sub, value, setter, adult]) => (
        <div
          key={label}
          className="mb-7 flex items-center justify-between last:mb-5"
        >
          <div>
            <div className="text-[17px] font-bold text-[#111]">{label}</div>
            <div className="mt-0.5 text-[14px] text-[#334]">{sub}</div>
          </div>

          <div className="flex items-center gap-5">
            <button
              disabled={adult ? value <= 1 : value === 0}
              onClick={() => setter(Math.max(adult ? 1 : 0, value - 1))}
              className={`flex h-10 w-10 items-center justify-center rounded-[5px] ${
                value > 0 && (!adult || value > 1)
                  ? 'bg-[#0646c5] text-white'
                  : 'bg-[#f1f2f5] text-[#999]'
              }`}
            >
              <Minus size={19} strokeWidth={3} />
            </button>

            <span className="w-3 text-center text-[17px] font-bold text-[#111]">
              {value}
            </span>

            <button
              onClick={() => setter(value + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-[5px] bg-[#0646c5] text-white"
            >
              <Plus size={21} strokeWidth={3} />
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={onDone}
        className="h-[51px] w-full rounded-[28px] bg-[#0646c5] text-[18px] font-bold text-white"
      >
        Done
      </button>
    </div>
  );
}

function Calendar({ depart, setDepart, ret, setRet, onDone }) {
  const months = [
    { name: 'September 2026', year: 2026, month: 8 },
    { name: 'October 2026', year: 2026, month: 9 },
  ];

  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  function days(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function first(year, month) {
    return new Date(year, month, 1).getDay();
  }

  function pick(day, monthIndex) {
    const month = months[monthIndex];

    const selected = `${month.year}-${String(month.month + 1).padStart(
      2,
      '0'
    )}-${String(day).padStart(2, '0')}`;

    if (!depart || ret) {
      setDepart(selected);
      setRet('');
    } else if (selected >= depart) {
      setRet(selected);
    } else {
      setDepart(selected);
      setRet('');
    }
  }

  const cell = (day, monthIndex) => {
    const month = months[monthIndex];

    const date = `${month.year}-${String(month.month + 1).padStart(
      2,
      '0'
    )}-${String(day).padStart(2, '0')}`;

    const disabled = date < '2026-09-11';
    const selected = date === depart || date === ret;
    const between = depart && ret && date > depart && date < ret;

    return (
      <button
        key={date}
        disabled={disabled}
        onClick={() => pick(day, monthIndex)}
        className={`relative flex h-10 items-center justify-center rounded-full text-[16px] font-semibold ${
          disabled
            ? 'text-[#a7b5cf]'
            : selected
            ? 'bg-[#0646c5] text-white'
            : between
            ? 'bg-[#eaf0ff] text-[#06275f]'
            : 'text-[#06275f] hover:bg-[#eef3fb]'
        }`}
      >
        {day}

        {date === '2026-09-11' && (
          <span className="absolute top-[35px] text-[10px] font-normal">
            Today
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="w-[930px] p-7 pt-5">
      <div className="mb-5 flex items-center gap-3">
        <button
          className={`flex h-[62px] w-[240px] items-center gap-4 rounded-[32px] border-2 px-6 ${
            !ret ? 'border-[#0646c5]' : 'border-[#d2d9e7]'
          }`}
        >
          <CalendarDays />
          <span className="text-[18px]">Depart</span>
        </button>

        <button
          className={`flex h-[62px] w-[240px] items-center gap-4 rounded-[32px] border-2 px-6 ${
            ret ? 'border-[#0646c5]' : 'border-[#d2d9e7]'
          }`}
        >
          <CalendarDays />
          <span className="text-[18px]">Return</span>
        </button>

        <div className="ml-auto flex items-center gap-8 font-bold">
          <span>
            Round-trip <ChevronDown size={18} className="ml-2 inline" />
          </span>

          <label className="flex items-center gap-3 font-normal">
            <Check />
            Direct Flights
          </label>
        </div>
      </div>

      <div className="-mx-7 border-t border-[#d8deea] px-7 pt-4">
        <div className="grid grid-cols-2 gap-12">
          {months.map((month, index) => (
            <div key={month.name}>
              <div className="relative mb-4 flex items-center justify-center">
                <h3 className="text-[20px] font-bold text-[#06275f]">
                  {month.name}
                </h3>

                {index === 1 && (
                  <button className="absolute right-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#eef1f6]">
                    <span className="text-3xl">›</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-7 gap-y-2">
                {weekdays.map((weekday, i) => (
                  <div
                    key={`${weekday}-${i}`}
                    className="text-center text-[16px] font-bold text-[#54709e]"
                  >
                    {weekday}
                  </div>
                ))}

                {Array.from({
                  length: first(month.year, month.month),
                }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}

                {Array.from(
                  { length: days(month.year, month.month) },
                  (_, i) => cell(i + 1, index)
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-end gap-10">
          <button
            className="text-[18px] font-bold text-[#83b1ff]"
            onClick={() => {
              setDepart('');
              setRet('');
            }}
          >
            Reset
          </button>

          <button
            onClick={onDone}
            className="h-[54px] w-[192px] rounded-[28px] bg-[#0646c5] text-[18px] font-bold text-white"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

function ClubMilesBanner({ clubMiles }) {
  return (
    <section className="mx-auto mt-[68px] w-full max-w-[1400px]">
      <div className="flex h-[184px] w-full overflow-hidden rounded-[92px] bg-[#f4f5f9]">
        <div className="relative h-[184px] w-[50%] shrink-0 overflow-hidden rounded-r-[92px]">
          <img
            src={clubMiles}
            alt="ClubMiles Rewards"
            className="block h-full w-full object-cover object-left"
          />

          <div className="absolute right-[-1px] top-1/2 z-20 flex h-[104px] w-[104px] -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,.12)]">
            <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full border-[6px] border-[#f7a719] bg-[#064bc5]">
              <Award
                size={43}
                strokeWidth={2.5}
                className="text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-between gap-5 px-[55px]">
          <div className="min-w-0 flex-1 text-[20px] leading-[1.55] text-[#050505]">
            <p className="whitespace-nowrap">
              <span className="font-bold">Save up to 10%</span> on select
              flights <span className="font-bold">($25 max).</span>
            </p>

            <p className="whitespace-nowrap">
              Stack airline miles and ClubMiles points.
            </p>
          </div>

          <button className="mr-[15px] shrink-0 rounded-full bg-[#064bc5] px-[18px] py-[17px] text-[22px] font-bold text-white">
            Plan my trip
          </button>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [tripOpen, setTripOpen] = useState(false);
  const [trip, setTrip] = useState('Round-trip');

  const [travOpen, setTravOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [senior, setSenior] = useState(0);
  const [child, setChild] = useState(0);
  const [seat, setSeat] = useState(0);
  const [lap, setLap] = useState(0);

  const [cabinOpen, setCabinOpen] = useState(false);
  const [cabin, setCabin] = useState('Coach');

  const [calOpen, setCalOpen] = useState(false);
  const [depart, setDepart] = useState('');
  const [ret, setRet] = useState('');

  const [origin, setOrigin] = useState('IDR - Indore, India');
  const [dest, setDest] = useState('');

  const [activeTab, setActiveTab] = useState('Flights');

  const total = adults + senior + child + seat + lap;

  const closeMenus = () => {
    setTripOpen(false);
    setTravOpen(false);
    setCabinOpen(false);
    setCalOpen(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#06275f]">
      {/* Header */}
      <header className="flex h-[98px] items-center justify-between border-t border-[#122d53] px-7">
        <div className="flex items-center gap-8">
          <Logo />

          <button className="flex items-center gap-1 text-[17px] font-bold">
            Explore Travel
            <ChevronDown size={18} />
          </button>
        </div>

        <div className="flex items-center gap-7 text-[16px] font-bold">
          <span className="flex items-center gap-3">
            <span className="h-7 w-7 overflow-hidden rounded-full bg-[#ddd]">
              <img
                src="https://i.pravatar.cc/80?img=47"
                className="h-full w-full object-cover"
                alt=""
              />
            </span>

            Phone-Only Deals! Call{' '}
            <span className="text-green-600">000-800-050-3540</span>
          </span>

          <MessageSquare />

          <span className="flex items-center gap-2">
            <Globe2 /> | USD
          </span>

          <span className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#06275f] text-white">
              A
            </span>
            Hi, Anshika
          </span>
        </div>
      </header>

      {/* Main container */}
      <main className="mx-auto w-full max-w-[1400px] px-0">
        <section className="relative pt-[47px]">
          {/* Hero */}
          <div className="grid grid-cols-[minmax(0,1fr)_364px] items-start gap-10">
            <h1 className="pt-1 text-[40px] font-extrabold leading-tight tracking-[-1px]">
              Book cheap flights on over{' '}
              <span className="text-[#ff4d13]">500</span> airlines
            </h1>

            <div className="relative h-[180px] w-[364px] shrink-0 overflow-hidden rounded-[18px] bg-white">
              <img
                src={fallEscape}
                alt="Plan your fall escape today"
                className="block h-full w-full object-fill"
              />
            </div>
          </div>

          {/* Product tabs */}
          <div className="mt-[-48px] mb-[57px] flex gap-3">
            {[
              ['Flights', Plane],
              ['Packages', Package],
              ['Hotels', BedDouble],
              ['Cars', CarFront],
              ['AI Search', Sparkles],
            ].map(([name, Icon], index) => (
              <button
                key={name}
                onClick={() => setActiveTab(name)}
                className={`pill ${
                  activeTab === name ? 'active' : ''
                } w-[136px] ${index === 4 ? 'px-5' : ''}`}
              >
                <Icon size={22} />

                <span>{name}</span>

                {name === 'AI Search' && (
                  <sup className="ml-[-6px] text-[9px] font-normal">
                    beta
                  </sup>
                )}
              </button>
            ))}
          </div>

          {/* Search options */}
          <div className="relative z-40 mb-[-1px] flex h-[43px] items-center gap-8">
            {/* Trip type */}
            <div className="relative">
              <button
                onClick={() => {
                  setTripOpen(!tripOpen);
                  setTravOpen(false);
                  setCabinOpen(false);
                }}
                className="flex items-center gap-3 text-[17px] font-bold"
              >
                {trip}
                <ChevronDown size={18} />
              </button>

              <Dropdown
                open={tripOpen}
                className="left-[-14px] top-[34px] w-[180px] py-4"
              >
                {tripOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setTrip(option);
                      setTripOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-6 py-3 text-left text-[17px] font-bold"
                  >
                    <Radio active={trip === option} />
                    {option}
                  </button>
                ))}
              </Dropdown>
            </div>

            {/* Travelers */}
            <div className="relative">
              <button
                onClick={() => {
                  setTravOpen(!travOpen);
                  setTripOpen(false);
                  setCabinOpen(false);
                }}
                className="flex items-center gap-3 text-[17px] font-bold"
              >
                <UserRound size={21} />
                {total} Traveler{total !== 1 ? 's' : ''}
                <ChevronDown size={18} />
              </button>

              <Dropdown
                open={travOpen}
                className="left-[-14px] top-[34px]"
              >
                <TravelerMenu
                  adults={adults}
                  setAdults={setAdults}
                  senior={senior}
                  setSenior={setSenior}
                  child={child}
                  setChild={setChild}
                  seat={seat}
                  setSeat={setSeat}
                  lap={lap}
                  setLap={setLap}
                  onDone={() => setTravOpen(false)}
                />
              </Dropdown>
            </div>

            {/* Cabin */}
            <div className="relative">
              <button
                onClick={() => {
                  setCabinOpen(!cabinOpen);
                  setTripOpen(false);
                  setTravOpen(false);
                }}
                className="flex items-center gap-3 text-[17px] font-bold"
              >
                {cabin}
                <ChevronDown size={18} />
              </button>

              <Dropdown
                open={cabinOpen}
                className="left-[-14px] top-[34px] w-[250px] py-4"
              >
                {cabinOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setCabin(option);
                      setCabinOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-7 py-3 text-left text-[17px] font-bold"
                  >
                    <Radio active={cabin === option} />
                    {option}
                  </button>
                ))}
              </Dropdown>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative z-30 flex h-[70px] w-full items-center overflow-visible rounded-[35px] border border-[#b8c8e2] bg-white shadow-[0_8px_25px_rgba(20,54,100,.12)]">
            {/* Origin */}
            <div className="flex h-full w-[380px] shrink-0 items-center gap-5 px-6">
              <Plane size={28} />
              <span className="text-[18px] font-semibold">
                {origin}
              </span>
            </div>

            {/* Swap */}
            <button
              onClick={() => {
                const currentOrigin = origin;
                setOrigin(dest);
                setDest(currentOrigin);
              }}
              className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full border border-[#c3d0e3] bg-white shadow-sm"
            >
              <ArrowLeftRight size={22} />
            </button>

            {/* Destination */}
            <div className="flex h-full min-w-0 flex-1 items-center gap-4 px-7 text-[19px] text-[#61779f]">
              <Plane size={28} />

              <input
                value={dest}
                onChange={(e) => setDest(e.target.value)}
                placeholder="Where to?"
                className="w-full bg-transparent text-[#06275f] outline-none placeholder:text-[#61779f]"
              />
            </div>

            <div className="h-[46px] w-[1px] shrink-0 bg-[#d2dbe9]" />

            {/* Depart */}
            <button
              onClick={() => setCalOpen(true)}
              className="flex h-full w-[190px] shrink-0 items-center gap-4 px-6 text-left text-[18px]"
            >
              <CalendarDays size={25} />

              <span
                className={
                  depart ? 'text-[#06275f]' : 'text-[#61779f]'
                }
              >
                {depart || 'Depart'}
              </span>
            </button>

            <div className="shrink-0 text-[23px] text-[#4e6691]">
              −
            </div>

            {/* Return */}
            <button
              onClick={() => setCalOpen(true)}
              className="flex h-full w-[180px] shrink-0 items-center gap-4 px-6 text-left text-[18px]"
            >
              <CalendarDays size={25} />

              <span
                className={ret ? 'text-[#06275f]' : 'text-[#61779f]'}
              >
                {ret || 'Return'}
              </span>
            </button>

            {/* Search */}
            <button className="mr-2 h-[54px] w-[170px] shrink-0 rounded-[28px] bg-[#fb480f] text-[19px] font-extrabold text-white hover:bg-[#ee3e08]">
              Search
            </button>

            {/* Calendar */}
            {calOpen && (
              <Dropdown
                open
                className="right-[20px] top-[88px] shadow-[0_5px_18px_rgba(0,0,0,.25)]"
              >
                <Calendar
                  depart={depart}
                  setDepart={setDepart}
                  ret={ret}
                  setRet={setRet}
                  onDone={() => setCalOpen(false)}
                />
              </Dropdown>
            )}
          </div>

          {/* Bundle & Save */}
          <div className="mt-4 flex items-center justify-between px-5 text-[16px]">
            <div className="flex items-center gap-5">
              <span className="font-extrabold">Bundle &amp; Save</span>

              <label className="flex items-center gap-2">
                <Check />
                Add Hotel
              </label>

              <label className="flex items-center gap-2">
                <Check />
                Add Car
              </label>
            </div>

            <div className="flex items-center gap-7">
              <label className="flex items-center gap-2">
                <Check />
                From/to another airport?
              </label>

              <button className="flex items-center gap-2">
                Advanced search
                <ChevronDown size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* ClubMiles */}
        <ClubMilesBanner clubMiles={clubMiles} />

        {/* Confidence */}
        <section className="mt-[68px] min-h-[180px] rounded-t-[20px] border border-[#c8d3e5] px-7 py-7">
          <h2 className="text-[30px] font-extrabold">
            Book with Confidence. Trusted by 40M+ Travelers
          </h2>

          <div className="mt-8 grid grid-cols-4 gap-8 text-[17px] font-bold">
            <div className="flex gap-3">
              <ShieldCheck />
              Price Match Promise
              <Info size={15} />
            </div>

            <div className="flex gap-3">
              <Headphones />
              Get Real Help, 24/7
            </div>

            <div className="flex gap-3">
              <Award />
              ClubMiles Rewards
            </div>

            <div className="flex gap-3">
              <CalendarDays />
              Easy Cancellations
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);