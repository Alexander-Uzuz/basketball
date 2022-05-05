import 'styled-components';
import { ITheme } from 'common/interfaces/styled';
declare module 'styled-components' {
export interface DefaultTheme extends ITheme {}
}
