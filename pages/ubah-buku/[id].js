import Layout from "@/widget/Layout";
import Judul from "@/components/Judul";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { db } from "@/config/firebase";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";

const UbahData = () => {
  const router = useRouter();
  let { id } = router.query;

  const [data, setData] = useState({
    nama_buku: "",
    pengarang: "",
    deskripsi_buku: "",
    tahun_terbit: "",
  });

  const bukuDocRef = doc(db, "buku", id);

  useEffect(() => {
    getBukuListById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getBukuListById = async () => {
    try {
      const docSnap = await getDoc(bukuDocRef);
      const dataBuku = docSnap.data();
      setData(dataBuku);
      console.log(dataBuku);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(bukuDocRef, {
        nama_buku: data.nama_buku,
        pengarang: data.pengarang,
        deskripsi_buku: data.deskripsi_buku,
        tahun_terbit: data.tahun_terbit,
      });
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  const handleChangeYear = (event) => {
    const limit = 4;
    setData({ ...data, tahun_terbit: event.target.value.slice(0, limit) });
  };

  return (
    <Layout>
      <div className="align-center ml-10 flex justify-center">
        <div className="m-10 w-[550px] rounded-lg p-10 pt-2 shadow-lg shadow-gray-200">
          <Judul nama="Form Ubah Buku" />
          <div>
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="text-md">Nama Buku</label>
                <input
                  type="text"
                  name="nama_buku"
                  className="mt-2 block w-10/12
                            rounded-xl border px-3 py-2"
                  onChange={(event) => {
                    setData({ ...data, nama_buku: event.target.value });
                  }}
                  value={data.nama_buku}
                  required
                />
              </div>
              <div className="mb-2">
                <label>Pengarang</label>
                <input
                  type="text"
                  name="pengarang"
                  className="mt-2 block w-10/12
                  rounded-xl border px-3 py-2"
                  onChange={(event) => {
                    setData({ ...data, pengarang: event.target.value });
                  }}
                  value={data.pengarang}
                  required
                />
              </div>
              <div className="mb-2">
                <label>Deskripsi Buku</label>
                <input
                  type="text"
                  name="deskripsi_buku"
                  className="mt-2 block w-10/12
                  rounded-xl border px-3 py-2"
                  onChange={(event) => {
                    setData({ ...data, deskripsi_buku: event.target.value });
                  }}
                  value={data.deskripsi_buku}
                  required
                />
              </div>
              <div className="mb-2">
                <label>Tahun Terbit</label>
                <input
                  type="number"
                  name="tahun_terbit"
                  className="mt-2 block w-10/12
                  rounded-xl border px-3 py-2"
                  onChange={handleChangeYear}
                  value={data.tahun_terbit}
                  maxLength={4}
                  required
                />
              </div>
              <div className="ml-20">
                <Button nama="Simpan Perubahan" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UbahData;
