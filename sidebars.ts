// Auto-generated sidebars from latest JSON (Scheme A, no id in frontmatter)
import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category', label: '入门', collapsed: true,
      items: ['intro/overview', 'intro/getting-started', 'intro/conventions'],
    },
    {
      type: 'category', label: 'LVGL', collapsed: true,
      items: [
        'lvgl/overview',
        { type: 'category', label: '控件', collapsed: true, items: ['lvgl/widgets/object', 'lvgl/widgets/label', 'lvgl/widgets/list', 'lvgl/widgets/dropdown', 'lvgl/widgets/textarea', 'lvgl/widgets/keyboard', 'lvgl/widgets/image', 'lvgl/widgets/led', 'lvgl/widgets/roller', 'lvgl/widgets/calendar', 'lvgl/widgets/analogtime', 'lvgl/widgets/pointer', 'lvgl/widgets/thumbnail', 'lvgl/widgets/curvedlabel', 'lvgl/widgets/imagebar', 'lvgl/widgets/imagelinebar', 'lvgl/widgets/imagelabel', 'lvgl/widgets/checkbox'] },
        { type: 'category', label: '模块', collapsed: true, items: ['lvgl/modules/disp', 'lvgl/modules/fs', 'lvgl/modules/group', 'lvgl/modules/indev'] },
        {
          type: 'category', label: '全局', collapsed: true, items: [
            {
              type: 'category',
              label: '全局函数',
              collapsed: true,
              link: {
                type: 'doc',
                id: 'lvgl/globals/functions/functions',
              },
              items: [
                'lvgl/globals/functions/HOR_RES',
                'lvgl/globals/functions/VER_RES',
                'lvgl/globals/functions/PCT',
                'lvgl/globals/functions/OPA',
                'lvgl/globals/functions/Font',
                'lvgl/globals/functions/Style',
                'lvgl/globals/functions/Timer',
                'lvgl/globals/functions/Anim',
              ],
            },
            'lvgl/globals/constants',
            'lvgl/globals/builtin-fonts'
          ]
        },
        { type: 'category', label: '枚举', collapsed: true, items: ['lvgl/enums/align', 'lvgl/enums/dir', 'lvgl/enums/flag', 'lvgl/enums/event', 'lvgl/enums/flex_align', 'lvgl/enums/flex_flow', 'lvgl/enums/grid_align', 'lvgl/enums/state', 'lvgl/enums/key', 'lvgl/enums/keyboard_mode', 'lvgl/enums/label', 'lvgl/enums/part', 'lvgl/enums/roller_mode', 'lvgl/enums/scrollbar_mode', 'lvgl/enums/scr_load_anim'] },
      ],
    },
    {
      type: 'category', label: 'Lua标准库', collapsed: true,
      items: ['official/overview'],
    },
    {
      type: 'category', label: 'Topic', collapsed: true,
      items: ['topic/overview'],
    },
    {
      type: 'category', label: 'Dataman', collapsed: true,
      items: ['dataman/overview'],
    },
    {
      type: 'category', label: 'Activity', collapsed: true,
      items: ['activity/overview'],
    },
    {
      type: 'category', label: 'Animengine', collapsed: true,
      items: ['animengine/overview'],
    },
    {
      type: 'category', label: 'Navigator', collapsed: true,
      items: ['navigator/overview'],
    },
    {
      type: 'category', label: 'Screen', collapsed: true,
      items: ['screen/overview'],
    },
    {
      type: 'category', label: 'Vibrator', collapsed: true,
      items: ['vibrator/overview'],
    }
  ],
};

export default sidebars;
