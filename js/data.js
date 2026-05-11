// Album catalog. To add a new album, append a new object to ALBUMS with:
//   id     - unique kebab-case slug (used as DOM value, must be unique)
//   title  - human-readable album name (shown in UI)
//   year   - release year (used to sort albums chronologically)
//   cover  - path to cover image, relative to the page
//   songs  - array of song objects in track order. Each song is { title, translation? }:
//              title       — the song's primary title (Japanese for most BBTS tracks)
//              translation — (optional) English / romaji rendering shown as subtext
//            Duplicate titles across albums are fine; each instance is treated separately.
//   single - (optional) true if this is a standalone single — gets bundled into the
//            "Singles" tile on the album grid instead of getting its own tile.
//
// Albums are listed alphabetically by title in this file for easier maintenance.
// At runtime they are sorted by year on export, so file order does not affect the UI.

const RAW_ALBUMS = [
    {
        id: 'believer-cover',
        title: 'Believer (cover)',
        year: 2023,
        cover: 'img/albums/believerCover.jpg',
        songs: [
            {title: 'Believer (cover)'},
        ],
        single: true,
    },
    {
        id: 'bucchigiri-tokyo',
        title: 'Bucchigiri Tokyo',
        year: 2024,
        cover: 'img/albums/bucchigiriTokyo.jpg',
        songs: [
            {title: 'ぶっちぎり東京', translation: 'Bucchigiri Tokyo'},
            {title: 'メタ盛るフォーゼ！', translation: 'Metamorphose!'},
            {title: 'O･TA･KUラブリー伝説', translation: 'OTAKU Lovely Densetsu'},
            {title: 'GAMBLER'},
            {title: 'いとをかしMyType', translation: 'Ito Okashi My Type'},
            {title: 'ボーナス☆ぎるてぃたいむ', translation: 'Bonus Guilty Time'},
        ],
    },
    {
        id: 'cherry-blossoms-are-blooming',
        title: 'Cherry Blossoms are Blooming',
        year: 0,
        cover: 'img/albums/cherryBlossomsAreBlooming.jpg',
        songs: [
            {title: 'Cherry blossoms are blooming ( instrumental )'},
            {title: 'Envy'},
            {title: 'TIME OUT'},
            {title: 'ghost mania'},
            {title: 'ZERO'},
            {title: 'ドラスティック・ナデシコ', translation: 'Drastic Nadeshiko'},
        ],
    },
    {
        id: 'girls-reform-manifest',
        title: 'Girls Reform Manifest',
        year: 0,
        cover: 'img/albums/girlsReformManifest.jpg',
        songs: [
            {title: 'SUNRISE 味噌SOUP', translation: 'SUNRISE MISO SOUP'},
            {title: 'センチメンタル☆ヒロイン', translation: 'Sentimental Heroine'},
            {title: 'ぶっ壊す!!', translation: 'BUKKOWASU !!'},
            {title: '私たちの７日間戦争', translation: 'Our 7 Day War'},
            {title: '令和マッチング世代', translation: 'Reiwa dating apps generation'},
            {title: 'Invisible wall'},
            {title: '我甘党', translation: 'We love sweets'},
            {title: 'L. C. G (2019mix)'},
            {title: '限界沼ライフ', translation: 'Genkai NUMA Life'},
            {title: 'Want to TIE - UP', translation: 'SUNRISE MISO SOUP'},

        ],
    },
    {
        id: 'hot-topic',
        title: 'HOT TOPIC',
        year: 2026,
        cover: 'img/albums/hotTopic.jpg',
        songs: [
            {title: 'ICONIC'},
            {title: 'Spicy Queen'},
            {title: 'トキメキAbout you', translation: 'Tokimeki About You'},
            {title: "GIRL'S TALK"},
            {title: 'はなびえんちゃん。のテーマ', translation: "HANABIE-chan's Theme"},
        ],
    },
    {
        id: 'karu-garu-everyday',
        title: 'Karu Garu Everyday!!',
        year: 2025,
        cover: 'img/albums/karuGaruEveryday.jpg',
        songs: [
            {title: 'かるガルEveryday!!', translation: 'Karu Garu Everyday!!'},
        ],
        single: true,
    },
    {
        id: 'odo-cover',
        title: 'Odo (cover)',
        year: 2025,
        cover: 'img/albums/odo.jpg',
        songs: [
            {title: 'Odo (cover)'}
        ],
        single: true,
    },
    {
        id: 'reborn-superstar',
        title: 'Reborn Superstar!',
        year: 2023,
        cover: 'img/albums/rebornSuperstar.jpg',
        songs: [
            {title: 'Blast Off'},
            {title: '超次元ギャラクシー', translation: 'Hyperdimenson Galaxy'},
            {title: 'NEET GAME'},
            {title: '今年こそギャル～初夏ver.～', translation: 'Be the GAL~Early Summer ver. ~'},
            {title: 'Tales of Villain'},
            {title: 'Warning!!'},
            {title: '我は宇宙最強のインベーダーちゃんである', translation: 'ME, The Ultimate Invader of the Universe'},
            {title: 'TOUSOU'},
            {title: 'お先に失礼します', translation: 'Pardon Me, I Have To Go Now.'},
            {title: "Today's Good Day & So Epic"},
        ],
    },
    {
        id: 'tasty-survivor',
        title: 'Tasty Survivor',
        year: 2025,
        cover: 'img/albums/tastySurvivor.jpg',
        songs: [
            {title: 'おいしいサバイバー', translation: 'Tasty Survivor'}
        ],
        single: true,
    },
];

// Array.sort is stable, so albums sharing a year preserve their RAW_ALBUMS order.
export const ALBUMS = [...RAW_ALBUMS].sort((a, b) => a.year - b.year);

export function buildSongList(selectedAlbumIds) {
    const songs = [];
    const seen = new Set();
    for (const album of ALBUMS) {
        if (!selectedAlbumIds.has(album.id)) continue;
        for (const song of album.songs) {
            const key = song.title.trim().toLowerCase();
            if (seen.has(key)) continue;
            seen.add(key);
            songs.push({title: song.title, translation: song.translation, album});
        }
    }
    return songs;
}
