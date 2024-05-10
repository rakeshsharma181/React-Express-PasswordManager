import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();

    const [form, setForm] = useState({ site: "", username: "", password: "" });

    const [passwordArray, setPasswordArray] = useState([]);

    const [buttonText, setButtonText] = useState('save password');

    useEffect(() => {
        fetch('http://localhost:3000/')
            .then((res) => res.json())
            .then((result) => setPasswordArray(result))
        console.log(passwordArray);

    }, [])


    const showPassword = () => {
        if (ref.current.src.includes('icons/eye.png')) {
            ref.current.src = 'icons/eye-crossed.png';
            passwordRef.current.type = 'text';
        }
        else {
            ref.current.src = 'icons/eye.png';
            passwordRef.current.type = 'password';

        }
    }
    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
            await fetch('http://localhost:3000/', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
            setForm({ site: "", username: "", password: "" });
            toast('🦄 Password Saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            toast('Error:Password Not Saved!')
        }

    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const copyText = (text) => {
        toast('🦄 Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text);
    }

    const deletePassword = async (id) => {
        let c = confirm("Do you want to delete");
        if (c) {
            setPasswordArray(passwordArray.filter((item) => item.id !== id));
            localStorage.setItem('passwords', JSON.stringify(passwordArray.filter((item) => item.id !== id)));
            await fetch('http://localhost:3000/', { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
        }
        toast('🦄 Password Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    }

    const editPassword = async (id) => {
        setButtonText('edit password')
        setForm(passwordArray.filter((item) => item.id === id)[0]);
        setPasswordArray(passwordArray.filter((item) => item.id !== id));


    }
    const saveUpdatedPassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            await fetch(`http://localhost:3000/${form.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form }) })
            setForm({ site: "", username: "", password: "" });
            setPasswordArray([...passwordArray, { ...form }]);

            setButtonText('save password');
            toast('🦄 Password Updated!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            toast('Error:Password Not Saved!')
        }
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>
            <div className="bg-slate-50 mycontainer">
                <h1 className='text 4xl text font-bold text-center'>
                    <span className='text-green-700'>&lt;</span>
                    Pass
                    <span className='text-green-700'>OP/&gt;</span>
                </h1>
                <p className='text-green-800 text-center text-lg'>Your Own Password Manager</p>
                <div className='text-white flex flex-col p-4 gap-3'>
                    <input className='rounded-full border border-green-500 w-full text-black p-4 py-1' type="text" placeholder='Enter website url' value={form.site} name='site' onChange={handleChange} />
                    <div className='flex w-full justify-between gap-3'>
                        <input className='rounded-full border border-green-500 w-full text-black p-4 py-1' type="text" placeholder='Enter username' value={form.username} name='username' onChange={handleChange} />
                        <div className="relative">
                            <input ref={passwordRef} className='rounded-full border border-green-500 w-full text-black p-4 py-1' type="password" placeholder='Enter Password' value={form.password} name='password' onChange={handleChange} />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>

                    </div>
                </div>
                {
                    buttonText === 'save password' ? (<button onClick={savePassword} className=' bg-green-400 hover:bg-green-400 rounded-full px-8 py-2 w-fit border border-r-green-400'>Add Password</button>) : (<button onClick={saveUpdatedPassword} className=' bg-green-400 hover:bg-green-400 rounded-full px-8 py-2 w-fit border border-r-green-400'>Edit Password</button>)
                }

                <div className="password">
                    <h2>Your Passwords</h2>
                    {passwordArray.length === 0 && <div><h1>No Passwords</h1></div>}
                    {passwordArray.length > 0 && <table className="table-auto w-full">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {
                                passwordArray.map((password, index) => (
                                    <tr key={index}>
                                        <td className='py-2  text-center border border-white'><a href={password.site} target='_blank'>{password.site}</a>
                                            <div className="flex items-center justify-center">
                                                <div onClick={() => copyText(password.site)} className="size-7 cursor-pointer">
                                                    <img src="icons/copy.png" style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }} alt="" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 text-center border border-white'>{password.username}
                                            <div className="flex items-center justify-center">
                                                <div onClick={() => copyText(password.username)} className="size-7 cursor-pointer">
                                                    <img src="icons/copy.png" style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }} alt="" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 text-center border border-white'>{password.password}
                                            <div className="flex items-center justify-center">
                                                <div onClick={() => copyText(password.password)} className="size-7 cursor-pointer">
                                                    <img src="icons/copy.png" style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }} alt="copy" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className=' flex py-2 text-center border border-white'>
                                            <span className='cursor-pointer mx-1'>
                                                <img src="icons/edit.png" style={{ "width": "25px", "height": "25px" }} alt="Edit" onClick={() => editPassword(password.id)} />
                                            </span>
                                            <span className='cursor-pointer mx-1'>
                                                <img src="icons/delete.png" style={{ "width": "25px", "height": "25px" }} alt="Delete" onClick={() => { deletePassword(password.id) }} />
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            }


                        </tbody>
                    </table>}

                </div>
            </div>
        </>
    )
}

export default Manager
