import { useRouter } from "next/router"
import Layout from "@/widget/Layout"
import Judul from "../components/Judul"
import { db } from "@/config/firebase"
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore"
import { useEffect, useState } from "react"
import IkonUbah from "@/public/IkonUbah"
import IkonHapus from "@/public/IkonHapus"

export default function Home() {
  const [buku, setBuku] = useState([])
  const router = useRouter()

  const bukuCollectionRef = collection(db, "buku")

  const addBookHandler = () => {
    router.push("/tambah-buku")
  }

  const getBukuList = async () => {
    try {
      const data = await getDocs(bukuCollectionRef)
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setBuku(filteredData)
      console.log(filteredData)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getBukuList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deleteBuku = async (id) => {
    const bukuDoc = doc(db, "buku", id)
    await deleteDoc(bukuDoc)
    getBukuList()
  }

  return (
    <Layout>
      <div className="flex container ml-10 justify-center align-center">
        <div>
          {/* judul */}
          <Judul nama="Data Perpustakaan" />
          {/* tombol tambah data buku */}
          <div className="mb-7">
            <button className="bg-sky-500 px-5 py-3 text-white rounded-full hover:bg-sky-700" onClick={addBookHandler}>Tambah Buku</button>
          </div>
          {/* tabel data buku */}
          <div>
            <table className="table-auto bg-sky-50 rounded-xl py-10">
              <thead className="mx-3 border-b-4">
                <tr>
                  <th scope="col" className="px-6 py-3">Nama Buku</th>
                  <th scope="col" className="px-6 py-3">Pengarang</th>
                  <th scope="col" className="px-6 py-3">Deskripsi Buku</th>
                  <th scope="col" className="px-6 py-3">Tahun Terbit</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {buku.map((data) => (
                  <tr key={data.id} className="hover:bg-sky-200">
                    <td scope="col" className="px-6 py-3">{data.nama_buku}</td>
                    <td scope="col" className="px-6 py-3">{data.pengarang}</td>
                    <td scope="col" className="px-6 py-3">{data.deskripsi_buku}</td>
                    <td scope="col" className="px-6 py-3">{data.tahun_terbit}</td>
                    <td scope="col" className="px-6 py-3 flex">
                      <span className="w-8 h-8 cursor-pointer mr-2" value={data.id} onClick={() => { router.push(`/ubah-buku/${data.id}`) }}>
                        <IkonUbah />
                      </span>
                      <span className="w-8 h-8 cursor-pointer" value={data.id} onClick={() => { deleteBuku(data.id) }}>
                        <IkonHapus />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </Layout>
  )
}
