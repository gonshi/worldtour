# markdownからの展開
## 使えるタグたち

基本的なタグはひと通り使えますが、クラスなどが任意に付けられないため、タグ単位でのスタイル付加のみ可能です。


### 見出し

見出しレベルは1~6まで。見出しテキストに英数字が入るとその部分はIDになる（日本語や空白は"-")で置き換わる

#### md3見出しレベル4
##### レベル５
###### レベル６


### 段落

pタグでのパラグラフ。

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dedecora, remotis damna argumentum afflueret, tandem notissima amicos deseruisse vel imperitos ipsos adiungimus. Imperio nullas hominum eximiae maiorem quandam vindicet animadversionem tantum nam. Civibus ipsius laboribus iniuste adipiscuntur.

### テキスト装飾

ああああ*イタリック（em)*ああああ

ああああ***太字（strong)***ああaaa

ああああ~~~斜線~~~ああああほほ

### リンク、画像

[link](http://kayac.com)

![image](http://lorempixel.com/gray/100/100/cats/2)

[![image](http://lorempixel.com/gray/100/100/cats/2)](http://kayac.com)

### リスト

- 順序なしリスト
- 子要素
    - 孫要素1
    - 孫要素2
    - 孫要素3
        - ひ孫要素3
        - ひ孫要素3
        - ひ孫要素3
    - 孫要素4
    - 孫要素5
- 子要素2
- 子要素3
- 子要素4


1. 順序有りリスト
1. 順序有りリスト
1. 順序有りリスト

### pre, code

```
```で囲むとpreになります
<p>hoge</p>
```

\`文字列\`は`code`

### blockquote

> 文頭に>でblockquoteになります
> このように。

### horizontal

\--- はhrです。

---


