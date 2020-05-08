```yml
title: ウェブの歴史から Ethereum のレイヤー構造を俯瞰してみる
description: Ethereum の 5 つレイヤーとウェブのエコシステムを照らし合わせて、Ethereum がウェブと同じように成長すると仮定したら何が起こるかを考えてみたい。
image: /asset/image/og.png
```

# ウェブの歴史から Ethereum のレイヤー構造を俯瞰してみる

ブロックチェーンリサーチディアの [d10n Lab](https://d10nlab.com) で公開されたレポート "パブリックブロックチェーン領域でのマネタイズの難しさを各レイヤーの優劣と競争構造から分析する" は、とくに Ethereum エコシステムでよく語られる 5 つのレイヤーをそれぞれ俯瞰し、各レイヤーにおけるマネタイズの特性や手法を分かりやすくまとめたレポートだった。( レポートは非公開なので読まれたい方は d10n Lab にご登録を )

そのレポートを読んでいると、その 5 つのレイヤー構造がウェブのエコシステムにも似て見えることに気づいた。Ethereum をスマートコントラクト実行環境だとしたら、ウェブも(そのままだが)ウェブアプリケーション実行環境ということができ、どちらも個々のプログラムを接続するネットワークと、プログラムを実行する環境を備えている点では同じ性質を持っている。Ethereum の将来像を考えるうえで、構造的に近似している(と僕は考えた)ウェブの歴史は参考になるかもしれない。2020 年現在、Ethereum の歴史は実装から約 6 年だが、ウェブは約 30 年の歴史を持つ。

この記事では、Ethereum の 5 つレイヤーとウェブのエコシステムを照らし合わせて、**Ethereum がウェブと同じように成長すると仮定** したら何が起こるかを考えてみたい。

## Ethereum の 5 つのレイヤー

最底辺のレイヤーを Ethereum チェーン、頂点をウォレットとするレイヤーはここでは詳細について省くことにして、大まかにまとめると次のようになるレイヤー構造のことだ。

|            | 内容                 | 具体例             |
| ---------- | -------------------- | ------------------ |
| レイヤー 5 | ウォレット           | MetaMask, Argent   |
| レイヤー 4 | アプリケーション     | InstaDApp, DeFiZap |
| レイヤー 3 | ミドルウェア         | MakerDAO, 0x       |
| レイヤー 2 | スケーリングや秘匿化 | Plasma, Rollups    |
| レイヤー 1 | ブロックチェーン     | Ethereum           |

頂点のレイヤーはユーザーがその実行環境(ブロックチェーン)を使ううえで実際に触れる媒体で、その下にアプリケーションが存在する。アプリケーションの下には共通基盤としての性質を持つアプリケーションがあり、それをミドルウェアと呼ぶ。ミドルウェアの下には実行環境のスペックを補う層があり、最下層にブロックチェーンがある。

そして今回はウェブにも当てはめて考えてみる。とくにアプリケーション実行環境としてのウェブという文脈で考えるならば以下のようになるのではないかと思う。

|            | 内容             | 具体例          |
| ---------- | ---------------- | --------------- |
| レイヤー 5 | ブラウザ         | Chrome, Firefox |
| レイヤー 4 | アプリケーション | Airbnb, Twitter |
| レイヤー 3 | PaaS             | Stripe, Auth0   |
| レイヤー 2 | ライブラリ       | React, jQuery   |
| レイヤー 1 | エンジン         | Webkit, Gecko   |

頂点のレイヤーはユーザーが実際に触れる媒体としてのブラウザ、その下にアプリケーションが存在する。アプリケーションとは 1 つのウェブサービスが当てはまる。アプリケーションの下には共通基盤としての性質を持つアプリケーションがあり、これを PaaS と呼ぶが X as a Service と呼べるものは基本的にここにカテゴライズできそうだ。PaaS の下には実行環境のスペックを補うものとしてライブラリがあり、最下層は実行基盤として Webkit や Gecko といったエンジン(レンダリングエンジン)がある。

この分類に異論のある人もいるかもしれないが、今回はこれをベースに考察を進めることとしてみる。

## レイヤー 5

Ethereum ならウォレット、ウェブならブラウザにあたるレイヤー。今回の趣旨に照らし合わせて、ウェブで起きたことが Ethereum でも起こると仮定して考える。

ウェブブラウザでは **ブラウザ戦争** といわれるシェア争いと、それぞれ独自の機能拡張が争われた時期があったが、現在では主要ブラウザすべてが標準仕様への準拠を第一義として足並みを揃えている。一方、そのシェアで見るとほぼ Chrome の独占状態である。

<x-embed>
	<template>
	    <div id="all-browser-ww-monthly-201903-202003" width="100%" height="400" style="width:100%; height: 400px;"></div><!-- You may change the values of width and height above to resize the chart --><p>Source: <a href="https://gs.statcounter.com/browser-market-share">StatCounter Global Stats - Browser Market Share</a></p><script type="text/javascript" src="https://www.statcounter.com/js/fusioncharts.js"></script><script type="text/javascript" src="https://gs.statcounter.com/chart.php?all-browser-ww-monthly-201903-202003&chartWidth=600"></script>
	</template>
</x-embed>

この統計を 2009 年から見てみる。

<x-embed>
	<template>
		<div id="all-browser-ww-monthly-200901-202003" width="100%" height="400" style="width:100%; height: 400px;"></div><!-- You may change the values of width and height above to resize the chart --><p>Source: <a href="https://gs.statcounter.com/browser-market-share#monthly-200901-202003">StatCounter Global Stats - Browser Market Share</a></p><script type="text/javascript" src="https://www.statcounter.com/js/fusioncharts.js"></script><script type="text/javascript" src="https://gs.statcounter.com/chart.php?all-browser-ww-monthly-200901-202003&chartWidth=600"></script>
	</template>
</x-embed>

IE, Firefox のシェアを、Chrome が急速に奪っていく様子が分かる。Ethereum ウォレットのシェアに関する統計が見つからなかったが、現在の圧倒的なシェアを持つウォレットでもその立場を維持できる可能性は低く、現在の新興ウォレットが数年で急速に成長するのかも知れない。

## レイヤー 4

Ethereum でもウェブでもアプリケーションにあたるレイヤーだ。

Ethereum ではアプリケーションレイヤーに対する注目が相対的に低い印象があるが、ウェブではこの層が最も競争が激しく、プレイヤーも多いレイヤーである。

ウェブにおけるアプリケーションの構築コストは下がり続けていて、そのぶん新たな開発者も呼び込んでいる。Ethereum アプリケーション(DApps)の構築コストも同じように下がっていき、開発者ではなくても DApps を構築できる環境が人気を獲得するようになるかもしれない。

ウェブアプリケーションの転機として知られているのは Gmail の誕生で、Gmail が登場するまではウェブでのメール(ウェブメーラー)は酷い使い勝手で、基本的にメールはネイティブのメーラーアプリを使うものだった。Gmail 誕生以後、ウェブで扱えなかったものが次々とウェブに流入してきた。Gmail の当初のユーザー体験は当時のメーラーに劣ることもあったが、結局メーラーというスタンドアロンのアプリケーションよりもクラウドストレージを使えること、常に同期されていることなどの利便性が高く評価されて今に至っている。

Ethereum において代表的なアプリケーションは取引所や金融サービスだが、プライベートチェーンでスタンドアロンに管理されていたデータがパブリックに流入することで他プロトコルとの接続性を獲得したり、偽装や改ざんが行われていないことを確認するために高いコンプライアンスコストを支払っていた分野が流入することはすでに顕在化している事象であり今後も拡大すると思われる。

また、ウェブにおける Gmail のように、今は未知の分野のアプリケーションが業界のデファクトスタンダードを獲得するようになるかも知れない。

## レイヤー 3

Ethereum ではミドルウェア、ウェブでは PaaS にあたるレイヤーだ。

ウェブにおけるアプリケーションレイヤーの隆起は、このレイヤーの貢献が非常に大きく、レイヤーの壁を越えて成長がリンクする好循環を生み出している。

アプリケーションレイヤーの構築コストを下げるための PaaS ができると、その PaaS を使ってユースケースを限定した PaaS を構築することができるようになり、アプリケーションの増加と、それによるビジネス機会の増加を狙って新たな PaaS が現われる。

Ethereum でも既存のミドルウェアの存在を前提としたミドルウェアがあるが、このようにレイヤー 3 の中で高低差を持つようになり、分野ごとに 3~4 個が目立つようになる。自然と、トレンドとなるレイヤーは下層ほど早く成熟していき、次第に上層へと移る。

とはいえ常に一方向とは限らない。ウェブでは仮想サーバーや関数のホスティングは Big 3( aws, Azure, GCP )に集中しているが、多機能化や複雑化が進んだ結果として、(それらをベースにして)より簡素で実地に即したサービスへと移行する流れも起きている。[Zeit がシリーズ A で \$21M を調達](https://vercel.com/blog/zeit-is-now-vercel) するなど、成熟しきった下層レイヤーをリファインするための PaaS が改めて人気を得ることもある。

Ethereum にはまだ下層レイヤー寄りのミドルウェアが多いが、今後はそれらをラップ/マッシュアップした一段上のレイヤーのミドルウェアが増えていき、そのトレンドがしばらく続くのかも知れない。分野ごとの最小単位としてのミドルウェアが 3~4 個に集中してくると、改めて下層からリファインされていくような循環が起きる可能性が高い。

## レイヤー 2

Ethereum ではスケーリングや秘匿化などネイティブの不足を補うもの、ウェブならライブラリにあたるレイヤーだ。

ウェブアプリケーションの構築には HTML, JavaScript, CSS の 3 つを技術を使うが、とりわけ重要なのが JavaScript であり、ウェブにおける唯一のプログラミング言語となっている。つまりライブラリとは JavaScript ライブラリを指す。JavaScript は ECMAScript という標準仕様に則って各エンジンが実装することになるが、その ECMASCript は 2015 年になるまで、14 年間でたった 5 回の改訂しかなされなかった。2015 年以後は 1 年ごとに改訂するようになり、急速に新たな仕様の普及が進んだ。

従ってライブラリの役割も大きく変わってきた。ブラウザごとの仕様実装状況が乖離していた頃は、その差分を補うために jQuery が活用された。今では jQuery に相当する API の多くが標準仕様に取り込まれ、もはや jQuery は不要となった。コンポーネント単位で切り分けて小さなスコープで開発するスタイルが主流になると Web Components が求められてきた。その新仕様に対応していないエンジン向けに Polymer などのライブラリが誕生したが、それも仕様に対応するエンジンが普及したことで不要となった。

ライブラリは常に標準仕様に不足しているスペックを一時的に補う存在で、下のレイヤーであるレイヤー 1 がアップデートされるたびに求められる姿が変わってきた。

Ethereum( に限らずブロックチェーン )は破壊的変更ができないという事情があるはずで、もし破壊的変更をするならそれはチェーンの分断を意味する。故に、レイヤー 1 の更新はウェブに比べると慎重さが求められるという点で状況は異なるが、下位互換を保ったまま行われるアップデートによってレイヤー 2 のソリューションが不要化することは起こるかも知れない。

## レイヤー 1

最底辺のレイヤーはエコシステムの根幹を成すものだ。ウェブのエコシステムにおいて本質的にはインターネットの存在があるが、ここではアプリケーション実行基盤として見るので、レイヤー 1 をエンジン(レンダリングエンジン)と考える。

ウェブの場合には異なるエンジンが共有する標準仕様を定めることになっている(なった)が、ブロックチェーンにおいて Ethereum と Bitcoin や Tezos が異なる仕様であるように、標準仕様というものはない。

上層レイヤーの開発者から見れば、ブロックチェーン同士のインターオペラビリティは今後向上していくことを期待しているはずだが、ブロックチェーンの非中央集権的性質を考えると標準仕様の策定は非常にハードルの高い作業になりそうだし、実際それは期待しているものとは違うとも思う。とはいえ分断された世界線がいくつも伸び続けることもエコシステムの成熟を阻害する。アンサーとして現状最も近い存在が Polkadot や Cosmos といったプロジェクトと理解している。

標準仕様を定めるという権威的ないし難易度の高い民主主義的プロセスに頼らずともインターオペラビリティを確保できるなら、それはウェブのエコシステムとは違うアプローチで同じ目標を達成しようとしていると言える。ということから、ウェブのような汎用的なアプリケーション実行基盤へと成長していく可能性が高い。

---

ここまで、Ethereum のエコシステムをウェブに置き換えて将来像を考えてみた。

僕の開発者としてのキャリアもウェブのほうが長く、ウェブに置き換えて考えてみるとだいぶ明瞭になったと思うし、こうやって考えてみるのは楽しかった。対比で語られがちな 2 軸であるが、アプリケーション実行基盤としての要求は共通していることが多い。

なおこの記事はなんら責任を負うものではなく、ただの個人的な遊びなのでその点はご留意いただければと思う。