import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // นำเข้าไอคอนหัวใจ

function Playlist() {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [likedPlaylists, setLikedPlaylists] = useState([]);

  useEffect(() => {
    const storedPlaylists = JSON.parse(localStorage.getItem("playlists"));
    if (storedPlaylists) {
      setPlaylists(storedPlaylists);
    }

    const storedLikedPlaylists = JSON.parse(localStorage.getItem("likedPlaylist"));
    if (storedLikedPlaylists) {
      setLikedPlaylists(storedLikedPlaylists);
    }
  }, []);

  const handleLikePlaylist = (index) => {
    const playlistId = playlists[index].name; // ใช้ชื่อเป็นตัวตรวจสอบ
    let newLikedPlaylists = [...likedPlaylists];
  
    if (newLikedPlaylists.includes(playlistId)) {
      newLikedPlaylists = newLikedPlaylists.filter(id => id !== playlistId);
    } else {
      newLikedPlaylists.push(playlistId);
    }
  
    setLikedPlaylists(newLikedPlaylists);
    localStorage.setItem("likedPlaylist", JSON.stringify(newLikedPlaylists));
  };
  

  return (
    <div className="text-black bg-gray-200 p-20">
      <h1 className="text-3xl font-semibold text-center">Playlist page</h1>

      <div>
        {playlists.map((playlist, index) => (
          <div
            key={index}
            className="flex items-center border p-4 rounded-md m-5 cursor-pointer bg-white relative"
            onClick={() => setSelectedPlaylist(index)}
          >
            <p className="m-2 p-20 bg-blue-400 h-fit w-fit">{playlist.name.slice(-1)}</p>
            <div className="m-5">
              <h2 className="flex font-bold text-xl text-blue-500">{playlist.name}</h2>
              <p>จำนวนเพลง: {playlist.songs.length}</p>
              <p>ระยะเวลา: {String(playlist.totalDuration.hours).padStart(2, '0')}:{String(playlist.totalDuration.minutes).padStart(2, '0')}:{String(playlist.totalDuration.seconds).padStart(2, '0')}</p>
              <p>แนวเพลง: {playlist.genres.join(", ")}</p>
            </div>
            <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLikePlaylist(index);
                }}
                className={`text-end text-xl p-2 absolute top-4 right-4 rounded-full ${
                  likedPlaylists.includes(playlist) ? 'text-red-500' : 'text-gray-300 hover:text-gray-400'
                }`}
              >
                {likedPlaylists.includes(playlist) ? <FaHeart /> : <FaRegHeart />} {/* ใช้ไอคอนแทนข้อความ */}
              </button>
          </div>
        ))}
      </div>

      {selectedPlaylist !== null && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-10">
          <div className="bg-white w-full max-w-4xl p-6 overflow-auto max-h-[70vh] rounded-md shadow-lg">
            <button
              onClick={() => setSelectedPlaylist(null)}
              className="text-red-500 text-lg mb-4"
            >
              
              ❌ กลับ
            </button>

            <h2 className="text-2xl font-bold">{playlists[selectedPlaylist].name}</h2>
            <p>ระยะเวลารวม: {playlists[selectedPlaylist].totalDuration.hours.toString().padStart(2, '0')}:{playlists[selectedPlaylist].totalDuration.minutes.toString().padStart(2, '0')}:{playlists[selectedPlaylist].totalDuration.seconds.toString().padStart(2, '0')}</p>

            <ul>
              {playlists[selectedPlaylist].songs.map((song, idx) => (
                <li key={idx} className="border-b p-4 flex">
                  {song.url && song.url !== "#" && (
                    <iframe
                      src={song.url}
                      className="border rounded-md h-fit w-fit"
                      allow="autoplay"
                    ></iframe>
                  )}

                  <div className="flex flex-1 justify-between items-center p-5">
                    <p className="font-medium">{song.songName} - {song.artist}</p>
                    <p className="text-gray-600">{Math.floor(song.duration / 60)}:
                      {(song.duration % 60).toString().padStart(2, '0')}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Playlist;
