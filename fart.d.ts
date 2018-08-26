declare module '*.frag';
declare module '*.glsl';
declare module '*.vert';
declare module '*.json';

type Component = number | number[] | Vector;
type Components = Array<number | number[] | Vector>;

type Factory = (...args: Components) => Vector;

type Vector = Vec2 | Vec3 | Vec4;

type Vec<Key extends string, Keys extends string> = Float32Array &
  { [K in Key]: number } &
  { [K in Keys]: number[] | Vector };

type Vec2 = Vec<Vec2Key, Vec2Keys>;
type Vec3 = Vec<Vec3Key, Vec3Keys>;
type Vec4 = Vec<Vec4Key, Vec4Keys>;

type Vec1Key = 'x' | 's' | 'r';
type Vec2Key = Vec1Key & 'y' | 't' | 'g';
type Vec3Key = Vec2Key & 'z' | 'p' | 'b';
type Vec4Key = Vec3Key & 'w' | 'q' | 'a';

type Vec2Keys =
  | 'xx'
  | 'xy'
  | 'yx'
  | 'yy'
  | 'ss'
  | 'st'
  | 'ts'
  | 'tt'
  | 'rr'
  | 'rg'
  | 'gr'
  | 'gg';
type Vec3Keys =
  | Vec2Keys & 'xz'
  | 'yz'
  | 'zx'
  | 'zy'
  | 'zz'
  | 'sp'
  | 'tp'
  | 'ps'
  | 'pt'
  | 'pp'
  | 'rb'
  | 'gb'
  | 'br'
  | 'bg'
  | 'bb'
  | 'xxx'
  | 'xxy'
  | 'xxz'
  | 'xyx'
  | 'xyy'
  | 'xyz'
  | 'xzx'
  | 'xzy'
  | 'xzz'
  | 'yxx'
  | 'yxy'
  | 'yxz'
  | 'yyx'
  | 'yyy'
  | 'yyz'
  | 'yzx'
  | 'yzy'
  | 'yzz'
  | 'zxx'
  | 'zxy'
  | 'zxz'
  | 'zyx'
  | 'zyy'
  | 'zyz'
  | 'zzx'
  | 'zzy'
  | 'zzz'
  | 'sss'
  | 'sst'
  | 'ssp'
  | 'sts'
  | 'stt'
  | 'stp'
  | 'sps'
  | 'spt'
  | 'spp'
  | 'tss'
  | 'tst'
  | 'tsp'
  | 'tts'
  | 'ttt'
  | 'ttp'
  | 'tps'
  | 'tpt'
  | 'tpp'
  | 'pss'
  | 'pst'
  | 'psp'
  | 'pts'
  | 'ptt'
  | 'ptp'
  | 'pps'
  | 'ppt'
  | 'ppp'
  | 'rrr'
  | 'rrg'
  | 'rrb'
  | 'rgr'
  | 'rgg'
  | 'rgb'
  | 'rbr'
  | 'rbg'
  | 'rbb'
  | 'grr'
  | 'grg'
  | 'grb'
  | 'ggr'
  | 'ggg'
  | 'ggb'
  | 'gbr'
  | 'gbg'
  | 'gbb'
  | 'brr'
  | 'brg'
  | 'brb'
  | 'bgr'
  | 'bgg'
  | 'bgb'
  | 'bbr'
  | 'bbg'
  | 'bbb';
type Vec4Keys =
  | Vec3Keys & 'xw'
  | 'yw'
  | 'zw'
  | 'wx'
  | 'wy'
  | 'wz'
  | 'ww'
  | 'sq'
  | 'tq'
  | 'pq'
  | 'qs'
  | 'qt'
  | 'qp'
  | 'qq'
  | 'ra'
  | 'ga'
  | 'ba'
  | 'ar'
  | 'ag'
  | 'ab'
  | 'aa'
  | 'xxw'
  | 'xyw'
  | 'xzw'
  | 'xwx'
  | 'xwy'
  | 'xwz'
  | 'xww'
  | 'yxw'
  | 'yyw'
  | 'yzw'
  | 'ywx'
  | 'ywy'
  | 'ywz'
  | 'yww'
  | 'zxw'
  | 'zyw'
  | 'zzw'
  | 'zwx'
  | 'zwy'
  | 'zwz'
  | 'zww'
  | 'wxx'
  | 'wxy'
  | 'wxz'
  | 'wxw'
  | 'wyx'
  | 'wyy'
  | 'wyz'
  | 'wyw'
  | 'wzx'
  | 'wzy'
  | 'wzz'
  | 'wzw'
  | 'wwx'
  | 'wwy'
  | 'wwz'
  | 'www'
  | 'ssq'
  | 'stq'
  | 'spq'
  | 'sqs'
  | 'sqt'
  | 'sqp'
  | 'sqq'
  | 'tsq'
  | 'ttq'
  | 'tpq'
  | 'tqs'
  | 'tqt'
  | 'tqp'
  | 'tqq'
  | 'psq'
  | 'ptq'
  | 'ppq'
  | 'pqs'
  | 'pqt'
  | 'pqp'
  | 'pqq'
  | 'qss'
  | 'qst'
  | 'qsp'
  | 'qsq'
  | 'qts'
  | 'qtt'
  | 'qtp'
  | 'qtq'
  | 'qps'
  | 'qpt'
  | 'qpp'
  | 'qpq'
  | 'qqs'
  | 'qqt'
  | 'qqp'
  | 'qqq'
  | 'rra'
  | 'rga'
  | 'rba'
  | 'rar'
  | 'rag'
  | 'rab'
  | 'raa'
  | 'gra'
  | 'gga'
  | 'gba'
  | 'gar'
  | 'gag'
  | 'gab'
  | 'gaa'
  | 'bra'
  | 'bga'
  | 'bba'
  | 'bar'
  | 'bag'
  | 'bab'
  | 'baa'
  | 'arr'
  | 'arg'
  | 'arb'
  | 'ara'
  | 'agr'
  | 'agg'
  | 'agb'
  | 'aga'
  | 'abr'
  | 'abg'
  | 'abb'
  | 'aba'
  | 'aar'
  | 'aag'
  | 'aab'
  | 'aaa'
  | 'xxxx'
  | 'xxxy'
  | 'xxxz'
  | 'xxxw'
  | 'xxyx'
  | 'xxyy'
  | 'xxyz'
  | 'xxyw'
  | 'xxzx'
  | 'xxzy'
  | 'xxzz'
  | 'xxzw'
  | 'xxwx'
  | 'xxwy'
  | 'xxwz'
  | 'xxww'
  | 'xyxx'
  | 'xyxy'
  | 'xyxz'
  | 'xyxw'
  | 'xyyx'
  | 'xyyy'
  | 'xyyz'
  | 'xyyw'
  | 'xyzx'
  | 'xyzy'
  | 'xyzz'
  | 'xyzw'
  | 'xywx'
  | 'xywy'
  | 'xywz'
  | 'xyww'
  | 'xzxx'
  | 'xzxy'
  | 'xzxz'
  | 'xzxw'
  | 'xzyx'
  | 'xzyy'
  | 'xzyz'
  | 'xzyw'
  | 'xzzx'
  | 'xzzy'
  | 'xzzz'
  | 'xzzw'
  | 'xzwx'
  | 'xzwy'
  | 'xzwz'
  | 'xzww'
  | 'xwxx'
  | 'xwxy'
  | 'xwxz'
  | 'xwxw'
  | 'xwyx'
  | 'xwyy'
  | 'xwyz'
  | 'xwyw'
  | 'xwzx'
  | 'xwzy'
  | 'xwzz'
  | 'xwzw'
  | 'xwwx'
  | 'xwwy'
  | 'xwwz'
  | 'xwww'
  | 'yxxx'
  | 'yxxy'
  | 'yxxz'
  | 'yxxw'
  | 'yxyx'
  | 'yxyy'
  | 'yxyz'
  | 'yxyw'
  | 'yxzx'
  | 'yxzy'
  | 'yxzz'
  | 'yxzw'
  | 'yxwx'
  | 'yxwy'
  | 'yxwz'
  | 'yxww'
  | 'yyxx'
  | 'yyxy'
  | 'yyxz'
  | 'yyxw'
  | 'yyyx'
  | 'yyyy'
  | 'yyyz'
  | 'yyyw'
  | 'yyzx'
  | 'yyzy'
  | 'yyzz'
  | 'yyzw'
  | 'yywx'
  | 'yywy'
  | 'yywz'
  | 'yyww'
  | 'yzxx'
  | 'yzxy'
  | 'yzxz'
  | 'yzxw'
  | 'yzyx'
  | 'yzyy'
  | 'yzyz'
  | 'yzyw'
  | 'yzzx'
  | 'yzzy'
  | 'yzzz'
  | 'yzzw'
  | 'yzwx'
  | 'yzwy'
  | 'yzwz'
  | 'yzww'
  | 'ywxx'
  | 'ywxy'
  | 'ywxz'
  | 'ywxw'
  | 'ywyx'
  | 'ywyy'
  | 'ywyz'
  | 'ywyw'
  | 'ywzx'
  | 'ywzy'
  | 'ywzz'
  | 'ywzw'
  | 'ywwx'
  | 'ywwy'
  | 'ywwz'
  | 'ywww'
  | 'zxxx'
  | 'zxxy'
  | 'zxxz'
  | 'zxxw'
  | 'zxyx'
  | 'zxyy'
  | 'zxyz'
  | 'zxyw'
  | 'zxzx'
  | 'zxzy'
  | 'zxzz'
  | 'zxzw'
  | 'zxwx'
  | 'zxwy'
  | 'zxwz'
  | 'zxww'
  | 'zyxx'
  | 'zyxy'
  | 'zyxz'
  | 'zyxw'
  | 'zyyx'
  | 'zyyy'
  | 'zyyz'
  | 'zyyw'
  | 'zyzx'
  | 'zyzy'
  | 'zyzz'
  | 'zyzw'
  | 'zywx'
  | 'zywy'
  | 'zywz'
  | 'zyww'
  | 'zzxx'
  | 'zzxy'
  | 'zzxz'
  | 'zzxw'
  | 'zzyx'
  | 'zzyy'
  | 'zzyz'
  | 'zzyw'
  | 'zzzx'
  | 'zzzy'
  | 'zzzz'
  | 'zzzw'
  | 'zzwx'
  | 'zzwy'
  | 'zzwz'
  | 'zzww'
  | 'zwxx'
  | 'zwxy'
  | 'zwxz'
  | 'zwxw'
  | 'zwyx'
  | 'zwyy'
  | 'zwyz'
  | 'zwyw'
  | 'zwzx'
  | 'zwzy'
  | 'zwzz'
  | 'zwzw'
  | 'zwwx'
  | 'zwwy'
  | 'zwwz'
  | 'zwww'
  | 'wxxx'
  | 'wxxy'
  | 'wxxz'
  | 'wxxw'
  | 'wxyx'
  | 'wxyy'
  | 'wxyz'
  | 'wxyw'
  | 'wxzx'
  | 'wxzy'
  | 'wxzz'
  | 'wxzw'
  | 'wxwx'
  | 'wxwy'
  | 'wxwz'
  | 'wxww'
  | 'wyxx'
  | 'wyxy'
  | 'wyxz'
  | 'wyxw'
  | 'wyyx'
  | 'wyyy'
  | 'wyyz'
  | 'wyyw'
  | 'wyzx'
  | 'wyzy'
  | 'wyzz'
  | 'wyzw'
  | 'wywx'
  | 'wywy'
  | 'wywz'
  | 'wyww'
  | 'wzxx'
  | 'wzxy'
  | 'wzxz'
  | 'wzxw'
  | 'wzyx'
  | 'wzyy'
  | 'wzyz'
  | 'wzyw'
  | 'wzzx'
  | 'wzzy'
  | 'wzzz'
  | 'wzzw'
  | 'wzwx'
  | 'wzwy'
  | 'wzwz'
  | 'wzww'
  | 'wwxx'
  | 'wwxy'
  | 'wwxz'
  | 'wwxw'
  | 'wwyx'
  | 'wwyy'
  | 'wwyz'
  | 'wwyw'
  | 'wwzx'
  | 'wwzy'
  | 'wwzz'
  | 'wwzw'
  | 'wwwx'
  | 'wwwy'
  | 'wwwz'
  | 'wwww'
  | 'ssss'
  | 'ssst'
  | 'sssp'
  | 'sssq'
  | 'ssts'
  | 'sstt'
  | 'sstp'
  | 'sstq'
  | 'ssps'
  | 'sspt'
  | 'sspp'
  | 'sspq'
  | 'ssqs'
  | 'ssqt'
  | 'ssqp'
  | 'ssqq'
  | 'stss'
  | 'stst'
  | 'stsp'
  | 'stsq'
  | 'stts'
  | 'sttt'
  | 'sttp'
  | 'sttq'
  | 'stps'
  | 'stpt'
  | 'stpp'
  | 'stpq'
  | 'stqs'
  | 'stqt'
  | 'stqp'
  | 'stqq'
  | 'spss'
  | 'spst'
  | 'spsp'
  | 'spsq'
  | 'spts'
  | 'sptt'
  | 'sptp'
  | 'sptq'
  | 'spps'
  | 'sppt'
  | 'sppp'
  | 'sppq'
  | 'spqs'
  | 'spqt'
  | 'spqp'
  | 'spqq'
  | 'sqss'
  | 'sqst'
  | 'sqsp'
  | 'sqsq'
  | 'sqts'
  | 'sqtt'
  | 'sqtp'
  | 'sqtq'
  | 'sqps'
  | 'sqpt'
  | 'sqpp'
  | 'sqpq'
  | 'sqqs'
  | 'sqqt'
  | 'sqqp'
  | 'sqqq'
  | 'tsss'
  | 'tsst'
  | 'tssp'
  | 'tssq'
  | 'tsts'
  | 'tstt'
  | 'tstp'
  | 'tstq'
  | 'tsps'
  | 'tspt'
  | 'tspp'
  | 'tspq'
  | 'tsqs'
  | 'tsqt'
  | 'tsqp'
  | 'tsqq'
  | 'ttss'
  | 'ttst'
  | 'ttsp'
  | 'ttsq'
  | 'ttts'
  | 'tttt'
  | 'tttp'
  | 'tttq'
  | 'ttps'
  | 'ttpt'
  | 'ttpp'
  | 'ttpq'
  | 'ttqs'
  | 'ttqt'
  | 'ttqp'
  | 'ttqq'
  | 'tpss'
  | 'tpst'
  | 'tpsp'
  | 'tpsq'
  | 'tpts'
  | 'tptt'
  | 'tptp'
  | 'tptq'
  | 'tpps'
  | 'tppt'
  | 'tppp'
  | 'tppq'
  | 'tpqs'
  | 'tpqt'
  | 'tpqp'
  | 'tpqq'
  | 'tqss'
  | 'tqst'
  | 'tqsp'
  | 'tqsq'
  | 'tqts'
  | 'tqtt'
  | 'tqtp'
  | 'tqtq'
  | 'tqps'
  | 'tqpt'
  | 'tqpp'
  | 'tqpq'
  | 'tqqs'
  | 'tqqt'
  | 'tqqp'
  | 'tqqq'
  | 'psss'
  | 'psst'
  | 'pssp'
  | 'pssq'
  | 'psts'
  | 'pstt'
  | 'pstp'
  | 'pstq'
  | 'psps'
  | 'pspt'
  | 'pspp'
  | 'pspq'
  | 'psqs'
  | 'psqt'
  | 'psqp'
  | 'psqq'
  | 'ptss'
  | 'ptst'
  | 'ptsp'
  | 'ptsq'
  | 'ptts'
  | 'pttt'
  | 'pttp'
  | 'pttq'
  | 'ptps'
  | 'ptpt'
  | 'ptpp'
  | 'ptpq'
  | 'ptqs'
  | 'ptqt'
  | 'ptqp'
  | 'ptqq'
  | 'ppss'
  | 'ppst'
  | 'ppsp'
  | 'ppsq'
  | 'ppts'
  | 'pptt'
  | 'pptp'
  | 'pptq'
  | 'ppps'
  | 'pppt'
  | 'pppp'
  | 'pppq'
  | 'ppqs'
  | 'ppqt'
  | 'ppqp'
  | 'ppqq'
  | 'pqss'
  | 'pqst'
  | 'pqsp'
  | 'pqsq'
  | 'pqts'
  | 'pqtt'
  | 'pqtp'
  | 'pqtq'
  | 'pqps'
  | 'pqpt'
  | 'pqpp'
  | 'pqpq'
  | 'pqqs'
  | 'pqqt'
  | 'pqqp'
  | 'pqqq'
  | 'qsss'
  | 'qsst'
  | 'qssp'
  | 'qssq'
  | 'qsts'
  | 'qstt'
  | 'qstp'
  | 'qstq'
  | 'qsps'
  | 'qspt'
  | 'qspp'
  | 'qspq'
  | 'qsqs'
  | 'qsqt'
  | 'qsqp'
  | 'qsqq'
  | 'qtss'
  | 'qtst'
  | 'qtsp'
  | 'qtsq'
  | 'qtts'
  | 'qttt'
  | 'qttp'
  | 'qttq'
  | 'qtps'
  | 'qtpt'
  | 'qtpp'
  | 'qtpq'
  | 'qtqs'
  | 'qtqt'
  | 'qtqp'
  | 'qtqq'
  | 'qpss'
  | 'qpst'
  | 'qpsp'
  | 'qpsq'
  | 'qpts'
  | 'qptt'
  | 'qptp'
  | 'qptq'
  | 'qpps'
  | 'qppt'
  | 'qppp'
  | 'qppq'
  | 'qpqs'
  | 'qpqt'
  | 'qpqp'
  | 'qpqq'
  | 'qqss'
  | 'qqst'
  | 'qqsp'
  | 'qqsq'
  | 'qqts'
  | 'qqtt'
  | 'qqtp'
  | 'qqtq'
  | 'qqps'
  | 'qqpt'
  | 'qqpp'
  | 'qqpq'
  | 'qqqs'
  | 'qqqt'
  | 'qqqp'
  | 'qqqq'
  | 'rrrr'
  | 'rrrg'
  | 'rrrb'
  | 'rrra'
  | 'rrgr'
  | 'rrgg'
  | 'rrgb'
  | 'rrga'
  | 'rrbr'
  | 'rrbg'
  | 'rrbb'
  | 'rrba'
  | 'rrar'
  | 'rrag'
  | 'rrab'
  | 'rraa'
  | 'rgrr'
  | 'rgrg'
  | 'rgrb'
  | 'rgra'
  | 'rggr'
  | 'rggg'
  | 'rggb'
  | 'rgga'
  | 'rgbr'
  | 'rgbg'
  | 'rgbb'
  | 'rgba'
  | 'rgar'
  | 'rgag'
  | 'rgab'
  | 'rgaa'
  | 'rbrr'
  | 'rbrg'
  | 'rbrb'
  | 'rbra'
  | 'rbgr'
  | 'rbgg'
  | 'rbgb'
  | 'rbga'
  | 'rbbr'
  | 'rbbg'
  | 'rbbb'
  | 'rbba'
  | 'rbar'
  | 'rbag'
  | 'rbab'
  | 'rbaa'
  | 'rarr'
  | 'rarg'
  | 'rarb'
  | 'rara'
  | 'ragr'
  | 'ragg'
  | 'ragb'
  | 'raga'
  | 'rabr'
  | 'rabg'
  | 'rabb'
  | 'raba'
  | 'raar'
  | 'raag'
  | 'raab'
  | 'raaa'
  | 'grrr'
  | 'grrg'
  | 'grrb'
  | 'grra'
  | 'grgr'
  | 'grgg'
  | 'grgb'
  | 'grga'
  | 'grbr'
  | 'grbg'
  | 'grbb'
  | 'grba'
  | 'grar'
  | 'grag'
  | 'grab'
  | 'graa'
  | 'ggrr'
  | 'ggrg'
  | 'ggrb'
  | 'ggra'
  | 'gggr'
  | 'gggg'
  | 'gggb'
  | 'ggga'
  | 'ggbr'
  | 'ggbg'
  | 'ggbb'
  | 'ggba'
  | 'ggar'
  | 'ggag'
  | 'ggab'
  | 'ggaa'
  | 'gbrr'
  | 'gbrg'
  | 'gbrb'
  | 'gbra'
  | 'gbgr'
  | 'gbgg'
  | 'gbgb'
  | 'gbga'
  | 'gbbr'
  | 'gbbg'
  | 'gbbb'
  | 'gbba'
  | 'gbar'
  | 'gbag'
  | 'gbab'
  | 'gbaa'
  | 'garr'
  | 'garg'
  | 'garb'
  | 'gara'
  | 'gagr'
  | 'gagg'
  | 'gagb'
  | 'gaga'
  | 'gabr'
  | 'gabg'
  | 'gabb'
  | 'gaba'
  | 'gaar'
  | 'gaag'
  | 'gaab'
  | 'gaaa'
  | 'brrr'
  | 'brrg'
  | 'brrb'
  | 'brra'
  | 'brgr'
  | 'brgg'
  | 'brgb'
  | 'brga'
  | 'brbr'
  | 'brbg'
  | 'brbb'
  | 'brba'
  | 'brar'
  | 'brag'
  | 'brab'
  | 'braa'
  | 'bgrr'
  | 'bgrg'
  | 'bgrb'
  | 'bgra'
  | 'bggr'
  | 'bggg'
  | 'bggb'
  | 'bgga'
  | 'bgbr'
  | 'bgbg'
  | 'bgbb'
  | 'bgba'
  | 'bgar'
  | 'bgag'
  | 'bgab'
  | 'bgaa'
  | 'bbrr'
  | 'bbrg'
  | 'bbrb'
  | 'bbra'
  | 'bbgr'
  | 'bbgg'
  | 'bbgb'
  | 'bbga'
  | 'bbbr'
  | 'bbbg'
  | 'bbbb'
  | 'bbba'
  | 'bbar'
  | 'bbag'
  | 'bbab'
  | 'bbaa'
  | 'barr'
  | 'barg'
  | 'barb'
  | 'bara'
  | 'bagr'
  | 'bagg'
  | 'bagb'
  | 'baga'
  | 'babr'
  | 'babg'
  | 'babb'
  | 'baba'
  | 'baar'
  | 'baag'
  | 'baab'
  | 'baaa'
  | 'arrr'
  | 'arrg'
  | 'arrb'
  | 'arra'
  | 'argr'
  | 'argg'
  | 'argb'
  | 'arga'
  | 'arbr'
  | 'arbg'
  | 'arbb'
  | 'arba'
  | 'arar'
  | 'arag'
  | 'arab'
  | 'araa'
  | 'agrr'
  | 'agrg'
  | 'agrb'
  | 'agra'
  | 'aggr'
  | 'aggg'
  | 'aggb'
  | 'agga'
  | 'agbr'
  | 'agbg'
  | 'agbb'
  | 'agba'
  | 'agar'
  | 'agag'
  | 'agab'
  | 'agaa'
  | 'abrr'
  | 'abrg'
  | 'abrb'
  | 'abra'
  | 'abgr'
  | 'abgg'
  | 'abgb'
  | 'abga'
  | 'abbr'
  | 'abbg'
  | 'abbb'
  | 'abba'
  | 'abar'
  | 'abag'
  | 'abab'
  | 'abaa'
  | 'aarr'
  | 'aarg'
  | 'aarb'
  | 'aara'
  | 'aagr'
  | 'aagg'
  | 'aagb'
  | 'aaga'
  | 'aabr'
  | 'aabg'
  | 'aabb'
  | 'aaba'
  | 'aaar'
  | 'aaag'
  | 'aaab'
  | 'aaaa';
