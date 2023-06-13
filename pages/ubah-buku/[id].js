import Layout from "@/widget/Layout"
import Judul from "@/components/Judul"
import Button from "@/components/Button"
import { useEffect, useState } from "react"
import { db } from "@/config/firebase"
import { getDoc, collection, addDoc, doc } from "firebase/firestore"
import { useRouter } from "next/router"

const UbahData = () => {
    const router = useRouter()
    const bukuCollectionRef = collection(db, "buku")

    const { id } = router.query
    console.log(id)

    const [data, setData] = useState({
        nama_buku: "",
        pengarang: "",
        deskripsi_buku: "",
        tahun_terbit: "",
    })

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const getBukuListById = async () => {
        try {
            const bukuDocRef = doc(db, "buku", "QEzxHDE0vs5V9J1LtkxL")
            const docSnap = await getDoc(bukuDocRef)
            const dataBuku = docSnap.data()
            setData(dataBuku)
            console.log(dataBuku)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getBukuListById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            await addDoc(bukuCollectionRef, {
                nama_buku: data.nama_buku,
                pengarang: data.pengarang,
                deskripsi_buku: data.deskripsi_buku,
                tahun_terbit: data.tahun_terbit
            })
            router.push('/')
        } catch (e) {
            console.error(e)
        }

    }

    return (
        <Layout>
            <div className="ml-10">
                <Judul nama="Form Ubah Buku" />
                <div>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-2">
                            <label className="mr-10">Nama Buku</label>
                            <input type="text" name="nama_buku" className="border
                            rounded-md px-3 py-1 focus:ring-blue-500 focus:border-blue-500 active:ring-blue-500 active:border-blue-500 block" onChange={handleChange} value={data.nama_buku} required />
                        </div>
                        <div className="mb-2">
                            <label>Pengarang</label>
                            <input type="text" name="pengarang" className="border
                            rounded-md px-3 py-1 focus:ring-blue-500 focus:border-blue-500 active:ring-blue-500 active:border-blue-500 block" onChange={handleChange} value={data.pengarang} required />
                        </div>
                        <div className="mb-2">
                            <label>Deskripsi Buku</label>
                            <input type="text" name="deskripsi_buku" className="border
                            rounded-md px-3 py-1 focus:ring-blue-500 focus:border-blue-500 active:ring-blue-500 active:border-blue-500 block"onChange={handleChange} value={data.deskripsi_buku} required />
                        </div>
                        <div className="mb-2">
                            <label>Tahun Terbit</label>
                            <input type="number" name="tahun_terbit" className="border
                            rounded-md px-3 py-1 focus:ring-blue-500 focus:border-blue-500 active:ring-blue-500 active:border-blue-500 block"onChange={handleChange} value={data.tahun_terbit} required />
                        </div>
                        <Button nama="Simpan Perubahan" />
                    </form>
                </div>
            </div>
        </Layout>

    )
}

export default UbahData