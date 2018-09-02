import Vector from '.';

export type Component = number | number[] | Vector;
export type Components = Component[];
export type Factory<V> = (...args: Array<number | number[] | Vector>) => V;

type Vec1 = Vector & { [K in Vec1D1]: number };
export type Vec2 = Vec1 &
  { [K in Vec2D1]: number } &
  { [K in Vec2D2]: Vec2 } &
  { [K in Vec2D3]: Vec3 } &
  { [K in Vec2D4]: Vec4 };
export type Vec3 = Vec2 &
  { [K in Vec3D1]: number } &
  { [K in Vec3D2]: Vec2 } &
  { [K in Vec3D3]: Vec3 } &
  { [K in Vec3D4]: Vec4 };
export type Vec4 = Vec3 &
  { [K in Vec4D1]: number } &
  { [K in Vec4D2]: Vec2 } &
  { [K in Vec4D3]: Vec3 } &
  { [K in Vec4D4]: Vec4 };

type Vec1D1 = 'x' | 's' | 'r';
type Vec2D1 = 'y' | 't' | 'g';
type Vec3D1 = 'z' | 'p' | 'b';
type Vec4D1 = 'w' | 'q' | 'a';

type Vec2D2 =
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
type Vec2D3 =
  | 'xxx'
  | 'xxy'
  | 'xyx'
  | 'xyy'
  | 'yxx'
  | 'yxy'
  | 'yyx'
  | 'yyy'
  | 'sss'
  | 'sst'
  | 'sts'
  | 'stt'
  | 'tss'
  | 'tst'
  | 'tts'
  | 'ttt'
  | 'rrr'
  | 'rrg'
  | 'rgr'
  | 'rgg'
  | 'grr'
  | 'grg'
  | 'ggr'
  | 'ggg';
type Vec2D4 =
  | 'xxxx'
  | 'xxxy'
  | 'xxyx'
  | 'xxyy'
  | 'xyxx'
  | 'xyxy'
  | 'xyyx'
  | 'xyyy'
  | 'yxxx'
  | 'yxxy'
  | 'yxyx'
  | 'yxyy'
  | 'yyxx'
  | 'yyxy'
  | 'yyyx'
  | 'yyyy'
  | 'ssss'
  | 'ssst'
  | 'ssts'
  | 'sstt'
  | 'stss'
  | 'stst'
  | 'stts'
  | 'sttt'
  | 'tsss'
  | 'tsst'
  | 'tsts'
  | 'tstt'
  | 'ttss'
  | 'ttst'
  | 'ttts'
  | 'tttt'
  | 'rrrr'
  | 'rrrg'
  | 'rrgr'
  | 'rrgg'
  | 'rgrr'
  | 'rgrg'
  | 'rggr'
  | 'rggg'
  | 'grrr'
  | 'grrg'
  | 'grgr'
  | 'grgg'
  | 'ggrr'
  | 'ggrg'
  | 'gggr'
  | 'gggg';

type Vec3D2 =
  | 'xz'
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
  | 'bb';
type Vec3D3 =
  | 'xxz'
  | 'xyz'
  | 'xzx'
  | 'xzy'
  | 'xzz'
  | 'yxz'
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
  | 'ssp'
  | 'stp'
  | 'sps'
  | 'spt'
  | 'spp'
  | 'tsp'
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
  | 'rrb'
  | 'rgb'
  | 'rbr'
  | 'rbg'
  | 'rbb'
  | 'grb'
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
type Vec3D4 =
  | 'xxxz'
  | 'xxyz'
  | 'xxzx'
  | 'xxzy'
  | 'xxzz'
  | 'xyxz'
  | 'xyyz'
  | 'xyzx'
  | 'xyzy'
  | 'xyzz'
  | 'xzxx'
  | 'xzxy'
  | 'xzxz'
  | 'xzyx'
  | 'xzyy'
  | 'xzyz'
  | 'xzzx'
  | 'xzzy'
  | 'xzzz'
  | 'yxxz'
  | 'yxyz'
  | 'yxzx'
  | 'yxzy'
  | 'yxzz'
  | 'yyxz'
  | 'yyyz'
  | 'yyzx'
  | 'yyzy'
  | 'yyzz'
  | 'yzxx'
  | 'yzxy'
  | 'yzxz'
  | 'yzyx'
  | 'yzyy'
  | 'yzyz'
  | 'yzzx'
  | 'yzzy'
  | 'yzzz'
  | 'zxxx'
  | 'zxxy'
  | 'zxxz'
  | 'zxyx'
  | 'zxyy'
  | 'zxyz'
  | 'zxzx'
  | 'zxzy'
  | 'zxzz'
  | 'zyxx'
  | 'zyxy'
  | 'zyxz'
  | 'zyyx'
  | 'zyyy'
  | 'zyyz'
  | 'zyzx'
  | 'zyzy'
  | 'zyzz'
  | 'zzxx'
  | 'zzxy'
  | 'zzxz'
  | 'zzyx'
  | 'zzyy'
  | 'zzyz'
  | 'zzzx'
  | 'zzzy'
  | 'zzzz'
  | 'sssp'
  | 'sstp'
  | 'ssps'
  | 'sspt'
  | 'sspp'
  | 'stsp'
  | 'sttp'
  | 'stps'
  | 'stpt'
  | 'stpp'
  | 'spss'
  | 'spst'
  | 'spsp'
  | 'spts'
  | 'sptt'
  | 'sptp'
  | 'spps'
  | 'sppt'
  | 'sppp'
  | 'tssp'
  | 'tstp'
  | 'tsps'
  | 'tspt'
  | 'tspp'
  | 'ttsp'
  | 'tttp'
  | 'ttps'
  | 'ttpt'
  | 'ttpp'
  | 'tpss'
  | 'tpst'
  | 'tpsp'
  | 'tpts'
  | 'tptt'
  | 'tptp'
  | 'tpps'
  | 'tppt'
  | 'tppp'
  | 'psss'
  | 'psst'
  | 'pssp'
  | 'psts'
  | 'pstt'
  | 'pstp'
  | 'psps'
  | 'pspt'
  | 'pspp'
  | 'ptss'
  | 'ptst'
  | 'ptsp'
  | 'ptts'
  | 'pttt'
  | 'pttp'
  | 'ptps'
  | 'ptpt'
  | 'ptpp'
  | 'ppss'
  | 'ppst'
  | 'ppsp'
  | 'ppts'
  | 'pptt'
  | 'pptp'
  | 'ppps'
  | 'pppt'
  | 'pppp'
  | 'rrrb'
  | 'rrgb'
  | 'rrbr'
  | 'rrbg'
  | 'rrbb'
  | 'rgrb'
  | 'rggb'
  | 'rgbr'
  | 'rgbg'
  | 'rgbb'
  | 'rbrr'
  | 'rbrg'
  | 'rbrb'
  | 'rbgr'
  | 'rbgg'
  | 'rbgb'
  | 'rbbr'
  | 'rbbg'
  | 'rbbb'
  | 'grrb'
  | 'grgb'
  | 'grbr'
  | 'grbg'
  | 'grbb'
  | 'ggrb'
  | 'gggb'
  | 'ggbr'
  | 'ggbg'
  | 'ggbb'
  | 'gbrr'
  | 'gbrg'
  | 'gbrb'
  | 'gbgr'
  | 'gbgg'
  | 'gbgb'
  | 'gbbr'
  | 'gbbg'
  | 'gbbb'
  | 'brrr'
  | 'brrg'
  | 'brrb'
  | 'brgr'
  | 'brgg'
  | 'brgb'
  | 'brbr'
  | 'brbg'
  | 'brbb'
  | 'bgrr'
  | 'bgrg'
  | 'bgrb'
  | 'bggr'
  | 'bggg'
  | 'bggb'
  | 'bgbr'
  | 'bgbg'
  | 'bgbb'
  | 'bbrr'
  | 'bbrg'
  | 'bbrb'
  | 'bbgr'
  | 'bbgg'
  | 'bbgb'
  | 'bbbr'
  | 'bbbg'
  | 'bbbb';

type Vec4D2 =
  | 'xw'
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
  | 'aa';
type Vec4D3 =
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
  | 'aaa';
type Vec4D4 =
  | 'xxxw'
  | 'xxyw'
  | 'xxzw'
  | 'xxwx'
  | 'xxwy'
  | 'xxwz'
  | 'xxww'
  | 'xyxw'
  | 'xyyw'
  | 'xyzw'
  | 'xywx'
  | 'xywy'
  | 'xywz'
  | 'xyww'
  | 'xzxw'
  | 'xzyw'
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
  | 'yxxw'
  | 'yxyw'
  | 'yxzw'
  | 'yxwx'
  | 'yxwy'
  | 'yxwz'
  | 'yxww'
  | 'yyxw'
  | 'yyyw'
  | 'yyzw'
  | 'yywx'
  | 'yywy'
  | 'yywz'
  | 'yyww'
  | 'yzxw'
  | 'yzyw'
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
  | 'zxxw'
  | 'zxyw'
  | 'zxzw'
  | 'zxwx'
  | 'zxwy'
  | 'zxwz'
  | 'zxww'
  | 'zyxw'
  | 'zyyw'
  | 'zyzw'
  | 'zywx'
  | 'zywy'
  | 'zywz'
  | 'zyww'
  | 'zzxw'
  | 'zzyw'
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
  | 'sssq'
  | 'sstq'
  | 'sspq'
  | 'ssqs'
  | 'ssqt'
  | 'ssqp'
  | 'ssqq'
  | 'stsq'
  | 'sttq'
  | 'stpq'
  | 'stqs'
  | 'stqt'
  | 'stqp'
  | 'stqq'
  | 'spsq'
  | 'sptq'
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
  | 'tssq'
  | 'tstq'
  | 'tspq'
  | 'tsqs'
  | 'tsqt'
  | 'tsqp'
  | 'tsqq'
  | 'ttsq'
  | 'tttq'
  | 'ttpq'
  | 'ttqs'
  | 'ttqt'
  | 'ttqp'
  | 'ttqq'
  | 'tpsq'
  | 'tptq'
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
  | 'pssq'
  | 'pstq'
  | 'pspq'
  | 'psqs'
  | 'psqt'
  | 'psqp'
  | 'psqq'
  | 'ptsq'
  | 'pttq'
  | 'ptpq'
  | 'ptqs'
  | 'ptqt'
  | 'ptqp'
  | 'ptqq'
  | 'ppsq'
  | 'pptq'
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
  | 'rrra'
  | 'rrga'
  | 'rrba'
  | 'rrar'
  | 'rrag'
  | 'rrab'
  | 'rraa'
  | 'rgra'
  | 'rgga'
  | 'rgba'
  | 'rgar'
  | 'rgag'
  | 'rgab'
  | 'rgaa'
  | 'rbra'
  | 'rbga'
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
  | 'grra'
  | 'grga'
  | 'grba'
  | 'grar'
  | 'grag'
  | 'grab'
  | 'graa'
  | 'ggra'
  | 'ggga'
  | 'ggba'
  | 'ggar'
  | 'ggag'
  | 'ggab'
  | 'ggaa'
  | 'gbra'
  | 'gbga'
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
  | 'brra'
  | 'brga'
  | 'brba'
  | 'brar'
  | 'brag'
  | 'brab'
  | 'braa'
  | 'bgra'
  | 'bgga'
  | 'bgba'
  | 'bgar'
  | 'bgag'
  | 'bgab'
  | 'bgaa'
  | 'bbra'
  | 'bbga'
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
