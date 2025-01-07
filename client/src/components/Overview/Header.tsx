const Header = () => {
  return (
    <div className="p-4">
      <h1 className='text-xl font-bold'>OVERVIEW</h1>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2 my-2 text-xs font-bold'>
          <span className='px-4 py-2 bg-neutral-800 text-neutral-100 rounded-full'>Day 3</span>
          <span className='px-4 py-2 bg-neutral-800 text-neutral-100 rounded-full'>Week 1</span>
          <span className='px-4 py-2 bg-neutral-800 text-neutral-100 rounded-full'>Cycle 1</span>
        </div>
      </div>
    </div>
  )
}

export default Header
